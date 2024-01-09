"use client";
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
export default async function Page() {
  async function handleclick() {
    const orderId = "eb47ccd7-8173-408c-960b-249309ca0a10";
    console.log("orderId", orderId);
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
      const { data, error } = await supabase
        .from('businesses')
        .update({ name: 'Updated Name' })
        .eq('id', orderId);
      if (error) {
        console.error('Error updating order:', error.message);
        toast.error('Error updating order');
      } else {
        console.log('Order updated successfully:', data);
        toast.success('Order updated successfully');
      }
    } catch (error) {
      console.error('Error in try-catch block:');
      toast.error('An unexpected error occurred');
    }
  }
  return (
    <button onClick={handleclick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  )
}
