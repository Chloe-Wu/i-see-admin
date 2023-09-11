import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const {data: session} = useSession();
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
      axios.get('/api/products').then(response => {
          setProducts(response.data)
      })
  },[])

  const [orders, setOrders] = useState([]);
  useEffect(() =>{
      axios.get('/api/orders').then(response => {
          setOrders(response.data)
      })
  },[]);

  const [categories, setCategories] = useState([]);
  useEffect(() =>{
    axios.get('/api/categories').then(response => {
      setCategories(response.data)
    })
},[]);

  return <Layout>
    <div>
      <div className="text-gray-500 flex justify-between">
        <h1>Introduction</h1>
        <div className="flex bg-gray-200 text-black gap-1 rounded-lg overflow-hidden">
          <img src = {session?.user?.image} alt="" className="w-10 h-10"/>
          {/* <span className="px-2">
          {session?.user?.name}
          </span> */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-white p-16 shadow-md rounded-lg">
            <h1>Hello, <b>{session?.user?.name}</b></h1>
            <br/>
            <p>Welcome to the I-SEE Admin Panel! As an administrator, you have the power to effortlessly manage inventory, <b>update product & category information, and monitor order details.</b></p>
            <br/>
            <p>It's simple – just navigate to the 'Products' or 'Categories' link in the navbar to add or edit information. Every edit you make here will seamlessly reflect on the I-SEE website. Plus, you can easily keep track of customer orders right here in the admin dashboard. Explore the full potential of I-SEE Admin and keep I-SEE's e-commerce website running smoothly!</p>
            <br/>
            <p>I-See Ecommerse website: <a className="text-primary" href="https://i-see-front.vercel.app/" target="_blank">https://i-see-front.vercel.app/</a></p>
      </div>
      <div className="flex flex-row gap-5 justify-between font-medium text-lg">
        <div className="bg-white w-full p-16 shadow-md rounded-lg">
          <p>Products : {products.length} </p>
        </div>
        <div className="bg-white w-full p-16 shadow-md rounded-lg">
          <p>Categories : {categories.length} </p>
        </div>
        <div className="bg-white w-full p-16 shadow-md rounded-lg">
          <p>Orders : {orders.length} </p>
        </div>
      </div>
      </div>
    </div>
    </Layout>
  
}
