interface ContainerItem {
  id: number;
  title: string;
  description: string;
  path: string;
  btn: string;
}

export const CONTAINER: ContainerItem[] = [
  {
    id: 0,
    title: "Product Inventory",
    description:
      "The Products Inventory Controller App is a user-friendly web application designed to manage and organize manufacturing products efficiently. It offers intuitive features for searching, sorting, and displaying product details such as name, category, price, and quantity.",
    path: "src/assets/product-inventory.png",
    btn: "Find Products",
  },
  {
    id: 1,
    title: "Product Management System",
    description:
      "The Product Management System is a versatile and interactive web application tailored for efficient management of product data. It provides a seamless interface for adding, updating, and viewing products with essential details like Product ID, Name, and Price.",
    path: "src/assets/PMS.png",
    btn: "Add Product",
  },
  {
    id: 2,
    title: "Order Processing System",
    description:
      " Our Order Processing System streamlines the entire order lifecycle, allowing efficient management and processing of customer orders. It features an organized dashboard displaying all orders with quick access to detailed informatior. Users can expand orders to view itemized lists with quantities and prices.",
    path: "src/assets/OPS.png",
    btn: "Add Order",
  },
];
