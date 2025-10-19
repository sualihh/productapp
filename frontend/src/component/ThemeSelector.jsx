import { PaletteIcon } from 'lucide-react'
import React from 'react'
import THEMES from '../constants/index.js'
import { useThemeStore } from '../store/useThemeStore.js'

function ThemeSelector() {
   
     const {theme, setTheme}= useThemeStore();
      console.log(theme);
      
  return (
    <div className='dropdown dropdown-end'>
      {/* ThemeSelector */}
      {/* drop down trigger */}
      <button tabIndex={0} className='btn btn-ghost btnc'>
        <PaletteIcon className='size-5' />
      </button>

      <div tabIndex={0} className='dropdown-content mt-1 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10'
      >
        {THEMES.map(themeOption => (
            <button key={themeOption.name}  
            className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl  transition-colors ${theme === themeOption.name? "bg-primary/10 text-primary": "hover:bg-base-content/5"}`}
            onClick={() => setTheme(themeOption.name)}
            >
              <PaletteIcon className='size-4' />
              <span className='text-sm font-medium'>{themeOption.label}</span>

            {/* theme color preview  */}
              <div className='ml-auto flex gap-1'>
                {themeOption.colors.map((color, i) => (
                  <span key={i} className='size-2 rounded-full' style={{backgroundColor: color}}></span>
                ))}
            </div>
            </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
