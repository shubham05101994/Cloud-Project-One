import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};

export const uploadfileuserinfo =  fileuserinfo => {
 return axios
    .post("FileinfoSave/", {
      Email_id: fileuserinfo.Email_id,
      File_description: fileuserinfo.File_description,
      Download_link: fileuserinfo.Download_link,
      File_upload_time: fileuserinfo.File_upload_time,
      File_updated_time: fileuserinfo.File_updated_time,
      File_delete_flag: fileuserinfo.File_delete_flag,
      File_deleted_time: fileuserinfo.File_deleted_time,
      File_Update_flag: fileuserinfo.File_Update_flag
    })
    .then(response => {
      
      return response.data;
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
 // console.log(response);
};

export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password 
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      localStorage.setItem("email", user.email);
      return response.data;
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
};



export const returnallfiles =  emailid => {
  console.log('in return all file api', emailid);
  return axios
     .get("returnfiles/", {
params:{
       Email_id: emailid
      }
     })
     .then(response => {
       console.log('all files', response);
       return response.data;
     })
     .catch(err => {
       console.log(err);
       alert(err);
     });
  // console.log(response);
 };

 export const deletefile =  key => {
  console.log('in delete all file api key', key);
  return axios
     .get("returnfiles/delete", {
params:{
       key: key
      }
     })
     .then(response => {
       console.log('all files', response);
       return response.data;
     })
     .catch(err => {
       console.log(err);
       alert(err);
     });
  // console.log(response);
 };

 //deletefileinfor from database
 export const deletefilefromdatabase =  id => {
  console.log('in delete all file api', id);
  return axios
     .delete("returnfiles/deletefromdatabase", {
params:{
       id: id
      }
     })
     .then(response => {
       console.log('Deleted from database', response);
       return response;
     })
     .catch(err => {
       console.log(err);
       alert(err);
     });
  // console.log(response);
 };


 export const sesmailfunctionality =  email => {
  console.log('in sesemailfunctionality', email);
  return axios
     .get("https://77k3rsl8sb.execute-api.us-east-1.amazonaws.com/prod/sesdeleteemail", {
params:{
       email: email
      }
     })
     .then(response => {
      if(response==null){
        console.log("email sent");
      }
      
     })
     .catch(err => {
       console.log(err);
       alert(err);
     });
  // console.log(response);
 };




 export const returnAdminfiles =  () => {
  return axios
     .get("returnfiles/admin")
     .then(response => {
       console.log('all admin files', response);
       return response;
     })
     .catch(err => {
       console.log(err);
       alert(err);
     });
  // console.log(response);
 };