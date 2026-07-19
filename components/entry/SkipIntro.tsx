"use client";

import { motion } from "framer-motion";

export default function SkipIntro() {

return(

<motion.button

initial={{opacity:0}}

animate={{opacity:1}}

transition={{

delay:6.5,

duration:1

}}

className="absolute bottom-8 right-8 text-gray-400 hover:text-[#C8A951]"

>

Skip Intro

</motion.button>

)

}