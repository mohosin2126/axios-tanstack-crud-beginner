import useAxiosPublic from "./useAxiosPublic";
import useGetData from "./useGetData";


const Delete = () => {
    const [bookings,refetch]=useGetData()
    const axiosPublic=useAxiosPublic()
    const handleCancel=(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }) .then((result) => {
            if (result.isConfirmed) {
    
                axiosPublic.delete(`/guidebookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
        <div>
        <div className="flex justify-evenly gap-10 my-4">
            <h2 className="text-3xl font-serif font-bold">All Booking Packages</h2>
            <h2 className="text-2xl">Total Booking: <span className="text-3xl font-semibold text-green-400">{bookings.length}</span> </h2>
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr><th></th>
                        <th>Package Name</th>
                        <th>Name</th>
                        <th> Guide Email</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
  {bookings.map((booking, index) => (
    <tr key={booking._id}>

      <th>{index + 1}</th>
      <td>{booking?.packagename}</td>
      <td className="font-base uppercase text-teal-500">{booking?.touristName}</td>
      <td className="font-medium from-stone-100">{booking?.tourGuide}</td>
      <td className="font-medium text-blue-700">{booking?.tourDate}</td>
      <td className="font-medium text-orange-600">{booking?.price}</td>
      <td className="font-medium text-green-700">{booking?.status}</td>
      <td>
        {booking.status === "Accepted" ? (
          <button className=" btn btn-sm btn-success">Pay</button>
        ) : (
          <button className="disable ">Pay</button>
        )}
      </td>
      <td>{booking.status === "In Review" ? (
          <button onClick={()=>handleCancel(booking._id)} className=" btn btn-outline btn-error btn-sm">Cancel</button>
        ) : (
          <button className="disable ">Cancel</button>
        )}</td>
      <td>Apply</td>
    </tr>
  ))}
</tbody>

            </table>
        </div>
    </div>
        </div>
    );
};

export default Delete;