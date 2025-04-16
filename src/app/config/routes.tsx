const routes = {
  client: {
    home: "/home",
    products: "/products",
    productDetail: "/product-detail/",
    cart: "/cart",
    checkout: "/checkout",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/forgot-password",
    account: {
      home: "/account",
      order: "/account/order",
      voucher: "/account/voucher",
      profile: "/account/profile",
      address: "/account/address",
      password: "/account/password",
    },
  },
  admin: {
    login: "/admin",
    dashboard: "/admin/dashboard",
    product: {
      list: "/admin/product/list",
      add: "/admin/product/add",
      edit: "/admin/product/edit/",
    },
    category: {
      list: "/admin/category/list",
      add: "/admin/category/add",
      edit: "/admin/category/edit/",
    },
    configuration: {
      list: "/admin/configuration/list",
      add: "/admin/configuration/add",
      edit: "/admin/configuration/edit/",
    },
    voucher: {
      list: "/admin/voucher/list",
      add: "/admin/voucher/add",
      edit: "/admin/voucher/edit/",
    },
    brand: {
      list: "/admin/brand/list",
      add: "/admin/brand/add",
      edit: "/admin/brand/edit/",
    },
    user: {
      list: "/admin/user/list",
      add: "/admin/user/add",
      edit: "/admin/user/edit/",
    },
    order: {
      list: "/admin/order/list",
    },
  },
};

export default routes;
