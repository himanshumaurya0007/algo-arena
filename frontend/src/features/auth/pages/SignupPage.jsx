
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../shared/utils/validation";


function SignupPage() {


  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });


  const [errors,setErrors] = useState({});


  const [showModal,setShowModal] = useState(false);


  const [modalData,setModalData] = useState({
    type:"",
    title:"",
    message:""
  });



  const openModal = (type,title,message)=>{

    setModalData({
      type,
      title,
      message
    });

    setShowModal(true);

  };





  const handleChange = (e)=>{

    const {name,value}=e.target;


    const updatedData={
      ...formData,
      [name]:value
    };


    setFormData(updatedData);


    let error="";



    switch(name){


      case "username":

        if(!value.trim())
          error="Username is required";

        else if(!validateUsername(value))
          error="Username must be 3-20 characters and contain only letters, numbers and _";

        break;




      case "email":

        if(!value.trim())
          error="Email is required";

        else if(!validateEmail(value))
          error="Enter a valid email address";

        break;




      case "password":

        if(!value.trim())
          error="Password is required";

        else if(!validatePassword(value))
          error="Password must contain 8 characters with uppercase, lowercase and number";

        break;




      case "confirmPassword":

        if(!value.trim())
          error="Confirm password is required";

        else if(value !== updatedData.password)
          error="Passwords do not match";

        break;


      default:
        break;

    }



    setErrors((prev)=>({
      ...prev,
      [name]:error
    }));

  };






  const handleSubmit=(e)=>{

    e.preventDefault();


    const validationErrors={};



    if(!formData.username.trim())
      validationErrors.username="Username is required";

    else if(!validateUsername(formData.username))
      validationErrors.username=
      "Username must be 3-20 characters and contain only letters, numbers and _";



    if(!formData.email.trim())
      validationErrors.email="Email is required";

    else if(!validateEmail(formData.email))
      validationErrors.email="Enter a valid email address";



    if(!formData.password.trim())
      validationErrors.password="Password is required";

    else if(!validatePassword(formData.password))
      validationErrors.password=
      "Password must contain 8 characters with uppercase, lowercase and number";



    if(!formData.confirmPassword.trim())
      validationErrors.confirmPassword="Confirm password is required";

    else if(formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword="Passwords do not match";





    if(Object.keys(validationErrors).length > 0){


      setErrors(validationErrors);


      openModal(
        "error",
        "Registration Failed",
        "Please fix the validation errors."
      );


      return;

    }





    // Store user

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        username:formData.username,
        email:formData.email,
        password:formData.password
      })
    );




    openModal(
      "success",
      "Account Created!",
      "Your account has been created successfully. Please login."
    );




    setFormData({
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    });


    setErrors({});


  };







return (

<>


{/* Dark Theme Modal */}

{
showModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">


<div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">


<div className="flex justify-center">


<div
className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
  
modalData.type==="success"
?
"bg-emerald-500/20 text-emerald-400 border border-emerald-500"
:
"bg-red-500/20 text-red-400 border border-red-500"

}`}
>

{
modalData.type==="success"
?
"✓"
:
"!"
}

</div>


</div>




<h2 className="mt-4 text-center text-xl font-bold text-white">

{modalData.title}

</h2>



<p className="mt-3 text-center text-sm text-slate-400">

{modalData.message}

</p>




<button

onClick={()=>setShowModal(false)}

className={`mt-6 w-full rounded-lg py-3 font-semibold ${
  
modalData.type==="success"
?
"bg-emerald-500 text-black hover:bg-emerald-400"
:
"bg-red-500 text-white hover:bg-red-400"

}`}

>

OK

</button>


</div>


</div>

)
}





<main className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-12">


<Card className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">


<div>

<h1 className="text-3xl font-bold text-white">
Create Account
</h1>


<p className="mt-2 text-sm text-slate-400">
Join AlgoArena and start tracking your coding practice.
</p>


</div>





<form onSubmit={handleSubmit} className="space-y-4">



{/* Username */}

<label className="block space-y-2">

<span className="text-sm font-semibold text-slate-200">
Username
</span>


<input

className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"

placeholder="Enter username"

type="text"

name="username"

value={formData.username}

onChange={handleChange}

/>


{
errors.username &&
<p className="text-sm text-red-400">
{errors.username}
</p>
}


</label>





{/* Email */}

<label className="block space-y-2">

<span className="text-sm font-semibold text-slate-200">
Email
</span>


<input

className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"

placeholder="you@example.com"

type="email"

name="email"

value={formData.email}

onChange={handleChange}

/>


{
errors.email &&
<p className="text-sm text-red-400">
{errors.email}
</p>
}


</label>





{/* Password */}

<label className="block space-y-2">

<span className="text-sm font-semibold text-slate-200">
Password
</span>


<input

className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"

placeholder="Create password"

type="password"

name="password"

value={formData.password}

onChange={handleChange}

/>


{
errors.password &&
<p className="text-sm text-red-400">
{errors.password}
</p>
}


</label>





{/* Confirm Password */}

<label className="block space-y-2">

<span className="text-sm font-semibold text-slate-200">
Confirm Password
</span>


<input

className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"

placeholder="Confirm password"

type="password"

name="confirmPassword"

value={formData.confirmPassword}

onChange={handleChange}

/>


{
errors.confirmPassword &&
<p className="text-sm text-red-400">
{errors.confirmPassword}
</p>
}


</label>





<Button
className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-black hover:bg-amber-400"
type="submit"
>

Create Account

</Button>



</form>





<p className="text-center text-sm text-slate-400">

Already have an account?{" "}

<Link
to="/login/user"
className="font-semibold text-amber-400 hover:text-amber-300"
>

Login

</Link>


</p>



</Card>


</main>


</>

);


}


export default SignupPage;