// "use client";
// import React, { useState } from "react";

// import { cn } from "@/lib/utils";
// import { Plus, Send, Star } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// type Props = {
//   formLink: string;
//   formHeading: string;
// };

// const ClickForm = ({ formLink, formHeading }: Props) => {
//   const [Stars, setStars] = useState(-1);
//   const [Open, setOpen] = useState(false);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted");
//   };

//   if (Open)
//     return (
//       <Dialog open={Open} onOpenChange={(open) => setOpen(open)}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{formHeading}</DialogTitle>
//           </DialogHeader>
//           {/*  */}
//           {/* <DialogFooter>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter> */}
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-2 px-3 py-2"
//           >
//             <div className="flex flex-row justify-center items-center gap-2">
//               {Array.from({ length: 5 }, (_, i) => (
//                 <Star
//                   key={i}
//                   className="cursor-pointer size-10"
//                   fill={i <= Stars ? "gold" : "#1111"}
//                   strokeWidth={0.5}
//                   onClick={() => setStars(i)}
//                 ></Star>
//               ))}
//               {/* <Send className="text-blue-500" /> */}
//             </div>
//             <textarea
//               name="review"
//               placeholder="How was your experience?"
//               className="border-slate-200 mt-1 px-2 py-1 border rounded-md focus:outline-none min-h-24"
//             />
//             <button className="flex flex-row justify-center gap-2 bg-blue-500 mt-1 py-1 rounded-md w-full text-white">
//               <p>Send</p>
//               <Send />
//             </button>
//           </form>
//         </DialogContent>
//       </Dialog>
//       // <AlertDialog open={Open}>
//       //   <AlertDialogContent>
//       //     <AlertDialogHeader>
//       //       <AlertDialogTitle>
//       //         {formHeading || "How's your experience?"}
//       //       </AlertDialogTitle>
//       //     </AlertDialogHeader>
//       // <form
//       //   onSubmit={handleSubmit}
//       //   className="flex flex-col gap-2 px-3 py-2"
//       // >
//       //   <div className="flex flex-row justify-center items-center gap-2">
//       //     {Array.from({ length: 5 }, (_, i) => (
//       //       <Star
//       //         key={i}
//       //         className="cursor-pointer size-10"
//       //         fill={i <= Stars ? "gold" : "#1111"}
//       //         strokeWidth={0.5}
//       //         onClick={() => setStars(i)}
//       //       ></Star>
//       //     ))}
//       //     {/* <Send className="text-blue-500" /> */}
//       //   </div>
//       //   <textarea
//       //     name="review"
//       //     placeholder="How was your experience?"
//       //     className="border-slate-200 mt-1 px-2 py-1 border rounded-md focus:outline-none min-h-24"
//       //   />
//       //   <button className="flex flex-row justify-center gap-2 bg-blue-500 mt-1 py-1 rounded-md w-full text-white">
//       //     <p>Send</p>
//       //     <Send />
//       //   </button>
//       // </form>
//       //   </AlertDialogContent>
//       // </AlertDialog>
//     );
//   return (
//     <button
//       onClick={() => setOpen(true)}
//       className="bg-amber-300 p-3 rounded-full text-white"
//     >
//       <Plus />
//     </button>
//   );
// };

// export default ClickForm;

// {
//   /* <form
//   onSubmit={handleSubmit}
//   className="flex flex-col gap-2 border-slate-300 px-3 py-2 border rounded-md max-w-80"
// >
//   <h1 className="mr-5 text-center">
//     {formHeading || "How would you rate us"}
//   </h1>
//   <div className="flex flex-row justify-center items-center gap-2">
//     {Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className="cursor-pointer size-10"
//         fill={i <= Stars ? "gold" : "#1111"}
//         strokeWidth={0.5}
//         onClick={() => setStars(i)}
//       ></Star>
//     ))}
//     <Send className="text-blue-500" />
//   </div>
// </form> */
// }

import React from "react";

type Props = {};

const ClickForm = (props: Props) => {
  return <div>ClickForm</div>;
};

export default ClickForm;
