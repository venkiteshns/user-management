// export const errorHander = (err, req, res, next) => {
//   const message = err.message;
//   console.log("middleware for error :", err.message);
//   // if(message = "jwt expired"){
//   //     return res.status(500).json({message})
//   // }
//   // res.set({
//   //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//   //   Pragma: "no-cache",
//   //   Expires: "0",
//   //   "Surrogate-Control": "no-store",
//   // });
//   res.status(500).json({ message });
// };
