"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from 'jwt-decode'; // Import a JWT decoding library
import { get } from 'http';


export default function Page() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState([]);
  const [businessesName, setBusinessesrName] = useState('');
  const data = useSelector((state: any) => state);
  const [order, setOrder] = useState([]);

  const handleDeleteOrder = async (orderId) => {
    console.log("orderId", orderId);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
      const {error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', orderId);
    
      if (error) {
        console.error('Error deleting order:', error.message);
        toast.error('Error deleting order');
      } else {
        toast.success('Order deleted successfully!');
      }
    } catch (error) {
      toast.error('Error deleting order');
    }
  };
  const handleAddOrder = async () => {
    if (!businessesName) {
      toast.error('Please enter a name for your order.');
      return;
    }
    const newOrder = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      user_id: data.user_id,
      email: data.email,
      name: businessesName,
    };

    setBusinessesrName('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data: createdOrder, error } = await supabase
        .from('businesses')
        .upsert(newOrder);

      if (error) {
        toast.error('Error inserting order:', error.message);
      } else {
        toast.success('Order inserted successfully!');
      }
    } catch (error) {
      console.log('Error inserting order:', error);
    }
    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('*');
      if (error) {
        console.log('Error fetching businesses:', error);
      } else {
        console.log('Businesses data:', businessData);
        setOrder(businessData);
      }
    } catch (error) {
      console.log('Error fetching businesses:', error);
    }
  };
  const fetchBusinesses = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('*');
      if (error) {
        console.log('Error fetching businesses:', error);
      } else {
        console.log('Businesses data:', businessData);
        setOrder(businessData);


      }
    } catch (error) {
      console.log('Error fetching businesses:', error);
    }
  };
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);
    const getUserById = async (id) => {
      const { data, error } = await supabase.from('users').select('user_id, name')

// console.log(data)
// Still => { id: 'd0714948', name: 'Jane' }

      if (error) {
        console.log(error);
        return null;
      }
      return data;
    }
    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    };

    const token = getCookie('authToken');
    if (token) {
      const decodedToken = parseJwt(token);
      const userid = decodedToken.sub;
      console.log("userid", userid);
        const user = getUserById(userid);
        console.log("user --> ", user);
    } else {
      router.push('/login');
    }
    fetchBusinesses();
  }, [])
  return (
    <div className='h-full w-full text-white bg-gray-900 pt-3'>
      <h1 className="text-4xl text-center font-bold mb-8">
        Businesses
      </h1>
      <div className="flex items-center justify-center text-gray-100 ">
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-100 font-bold mb-2"
              htmlFor="businessesName"
            >
              Order Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessesName"
              type="text"
              placeholder="Order Name"
              value={businessesName}
              onChange={(e) => setBusinessesrName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddOrder}
            >
              Add Order
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-100 mt-5">
        {order.map((order) => (
          console.log("order", order),
          <div key={order.id} className="mb-4">
            <p>Order Name: {order.name}</p>
            <p>Created At: {order.created_at}</p>
            {/* Add delete button */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
              type="button"
              onClick={() => handleDeleteOrder(order.id)} >
              Delete
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2" type="button">
              Edit
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}