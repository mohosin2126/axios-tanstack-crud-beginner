

const PostData = () => {
    const axiosSecure=useAxiosSecure()

    const{_id,image,category,title,price,}=place
    
    const handleAddToWishlist=(place)=>{
      
  const wishlistItem={
     categoryId :_id,
      email:user.email,
      title,
      image,
      price
  }
  
  axiosSecure.post("/wishlist",wishlistItem)
  .then(res=>{
      if (res.data.insertedId) {
        
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Added To Wishlist",
          showConfirmButton: false,
          timer: 1500
        });
      }
  })
  
  
  
    
  }

    return (
        <div>
            <button onClick={()=>handleAddToWishlist(place)}   
      className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-dark="true"
    ></button>
        </div>
    );
};

export default PostData;