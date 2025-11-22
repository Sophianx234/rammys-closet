'use client'

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Search, Filter, Eye, ShoppingBag, User as UserIcon, X } from "lucide-react";

// --- Types based on your Schemas ---

interface IOrderSummary {
  _id: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: string;
  createdAt: string;
  itemsCount: number;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  profile?: string;
  role: "customer" | "admin" | "buyer" | "dispatcher";
  createdAt: string;
  wishlist: any[]; 
  orders:number
}

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});


// --- Helper Functions ---

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin": return "destructive"; // Red
    case "dispatcher": return "secondary"; // Gray/Blue
    case "buyer": return "default"; // Black
    default: return "outline"; // Customer
  }
};

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "delivered": return "bg-green-100 text-green-800 border-green-200";
    case "cancelled": return "bg-red-100 text-red-800 border-red-200";
    case "processing": return "bg-blue-100 text-blue-800 border-blue-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
};

export default function AdminUsersPage() {
  // --- State ---
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Selection & Modals
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // User Specific Data (fetched on demand)
  const [userOrders, setUserOrders] = useState<IOrderSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // --- Fetching ---

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      setUsers(Array.isArray(data.customers) ? data.customers : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when a user is selected for view
  const fetchUserOrders = async (userId: string) => {
    setOrdersLoading(true);
    try {
      // NOTE: You need to create this API endpoint or adjust the path
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();
      setUserOrders(data.orders || []); 
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setUserOrders([]); // Fallback empty
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Handlers ---

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
    fetchUserOrders(user._id);
  };

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }), // Only sending role update
      });
      
      if (res.ok) {
        const data = await res.json()
        console.log('user new role ',data)
        // Update local state to reflect change immediately
        setUsers(users.map(u => u._id === selectedUser._id ? { ...u, role: newRole as any } : u));
        setSelectedUser({ ...selectedUser, role: newRole as any });

         Toast.fire({
        icon: "success",
        title: `Role updated to ${newRole}`,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Failed to update role",
      });
    }
  } catch (error) {
    console.error("Error updating role:", error);

    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
  }
};

  const handleDeleteUser = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete User?",
    text: "Are you sure you want to delete this user? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    reverseButtons: true,
  });

  if (!result.isConfirmed) {
    Toast.fire({
      icon: "info",
      title: "Delete cancelled",
    });
    return;
  }

  try {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

    if (res.ok) {
      setUsers(users.filter(u => u._id !== id));
      if (selectedUser?._id === id) setIsDetailOpen(false);

      Toast.fire({
        icon: "success",
        title: "User deleted successfully",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Failed to delete user",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);

    Toast.fire({
      icon: "error",
      title: "Unexpected error occurred",
    });
  }
};



  // --- Filtering Logic ---

  const filteredUsers = users.filter((u) => {
    const matchesSearch = (u.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
                          (u.email?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">View, filter, and manage system users and their roles.</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg text-sm">
          <span className="font-medium">Total Users:</span>
          <Badge variant="outline" className="bg-background">{users.length}</Badge>
        </div>
      </div>

      <Card className="shadow-sm border-muted">
        <CardContent className="p-6">
          {/* Filter Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <div className="flex flex-1 items-center gap-3 w-full">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-9 bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground"/>
                    <SelectValue placeholder="Filter Role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="dispatcher">Dispatcher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Clear Filters (Optional visual cue) */}
            {(search || roleFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setRoleFilter("all"); }} className="text-muted-foreground hover:text-foreground">
                Reset Filters <X className="w-3 h-3 ml-2" />
              </Button>
            )}
          </div>

          {/* Main User Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[250px]">User Profile</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">Loading users...</TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                   <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No users found.</TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary border">
                            <img 
                              src={user.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                              alt={user.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeColor(user.role) as any} className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {/* Assuming we don't fetch order count initially, standard practice is usually a separate count query, 
                            but using wishlist length as a placeholder from your original code */}
                        <span className="text-sm font-mono text-muted-foreground">
                          {/* If you want real order count, you need to aggregate it in the initial API */}
                          {user.orders} 
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteUser(user._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* DETAILED USER VIEW DIALOG (Acting as a Sheet/Modal) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
          
          {selectedUser && (
            <>
              {/* Modal Header */}
              <div className="p-6 bg-secondary/20 border-b">
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedUser.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}`} 
                      className="w-16 h-16 rounded-full border-4 border-background shadow-sm"
                    />
                    <div className="space-y-1">
                      <DialogTitle className="text-2xl">{selectedUser.name}</DialogTitle>
                      <DialogDescription>{selectedUser.email}</DialogDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getRoleBadgeColor(selectedUser.role) as any}>
                          {selectedUser.role.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Member since {new Date(selectedUser.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              {/* Modal Content with Tabs */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="profile">Profile & Settings</TabsTrigger>
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                  </TabsList>

                  {/* TAB 1: PROFILE & SETTINGS */}
                  <TabsContent value="profile" className="space-y-6">
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <UserIcon className="w-4 h-4" /> Role Management
                        </h3>
                        <Separator />
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900 text-sm text-yellow-800 dark:text-yellow-200 mb-4">
                          Changing a user's role grants them different permissions. Admins have full access.
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex-1">
                             <label className="text-sm font-medium mb-1 block">Current Role</label>
                             <Select 
                               value={selectedUser.role} 
                               onValueChange={handleUpdateRole}
                             >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="buyer">Buyer</SelectItem>
                                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                              </SelectContent>
                            </Select>
                           </div>
                        </div>
                      </div>

                      {/* Add Address or other fields here if needed based on your User Schema */}
                      <div className="space-y-2 pt-4">
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground uppercase font-bold">Email</label>
                            <p className="text-sm font-medium">{selectedUser.email}</p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground uppercase font-bold">User ID</label>
                            <p className="text-sm font-mono text-muted-foreground">{selectedUser._id}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* TAB 2: ORDER HISTORY */}
                  <TabsContent value="orders">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" /> Past Orders
                        </h3>
                        {userOrders.length > 0 && <Badge variant="secondary">{userOrders.length} Orders</Badge>}
                      </div>
                      <Separator />
                      
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Payment</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ordersLoading ? (
                              <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">Loading orders...</TableCell>
                              </TableRow>
                            ) : userOrders.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                  No orders found for this user.
                                </TableCell>
                              </TableRow>
                            ) : (
                              userOrders.map((order) => (
                                <TableRow key={order._id}>
                                  <TableCell className="font-mono text-xs">{order._id.slice(-6).toUpperCase()}</TableCell>
                                  <TableCell className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className={`border-0 ${getOrderStatusColor(order.orderStatus)}`}>
                                      {order.orderStatus}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span className={`w-2 h-2 rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                      <span className="capitalize text-sm">{order.paymentStatus}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(order.totalAmount)}
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter className="p-6 border-t bg-secondary/10">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close Details</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}