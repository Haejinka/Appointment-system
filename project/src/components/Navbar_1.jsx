import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar_1 = () => {
  return (
    <aside class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    

    
    <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <NavLink to="/" className={({ isActive }) => 
          `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
          ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
          }` 
       }>
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span class="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink to="/client" className={({ isActive }) => 
          `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
          ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
          }` 
       }>
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span class="mx-4 font-medium">Clients</span>
            </NavLink>
            <NavLink to="/pet" className={({ isActive }) => 
          `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
          ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
          }` 
       }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
            </svg>


                <span class="mx-4 font-medium">Pet Info</span>
            </NavLink>

            <NavLink to="/appointment" className={({ isActive }) => 
          `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
          ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
          }` 
       }>
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <span class="mx-4 font-medium">Appointments</span>
            </NavLink>

            <NavLink to="/services" className={({ isActive }) => 
          `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
          ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
          }` 
       }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>


                <span class="mx-4 font-medium">Services</span>
            </NavLink>
            

            <hr class="my-6 border-gray-200 dark:border-gray-600" />
            

            <NavLink to="/tickets" className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
                ${isActive 
                    ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
                    : 'text-gray-700 dark:text-gray-200 ' // Default styles 
                }` 
          }>
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="mx-4 font-medium">Tickets</span>
    </NavLink>
    <NavLink to="/history" className={({ isActive }) => 
    `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800
        ${isActive 
            ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
            : 'text-gray-700 dark:text-gray-200 ' // Default styles 
        }` 
}>
   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

    <span class="mx-4 font-medium">History</span>
</NavLink>



            <NavLink to="/settings" className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-80
            ${isActive 
              ? 'bg-gray-100 dark:bg-gray-800 text-white '  // Active styles
              : 'text-gray-700 dark:text-gray-200 ' // Default styles 
            }` 
          }>
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            <span className="mx-4 font-medium">Settings</span>
          </NavLink>
        </nav>

        <a href="#" class="flex items-center px-4 -mx-2">
            <img class="object-cover mx-2 rounded-full h-9 w-9" src="./images/logo1.png" alt="avatar" />
            <span class="mx-2 font-medium text-gray-800 dark:text-gray-200">Admin</span>
        </a>
    </div>
</aside>
  )
}

export default Navbar_1