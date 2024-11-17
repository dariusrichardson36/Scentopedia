// src/pages/EachFragrance.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import fragranceImage from '../placeholders/fragranceImage.jpg';

// TabPanel Component
// This component is used to display content within a tab, only when the selected tab matches the index.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// EachFragrance Component
// This component renders detailed information about a specific fragrance, including its image, notes, and description.
const EachFragrance: React.FC = () => {
    const { fragranceId } = useParams<{ fragranceId: string }>(); // Retrieve the fragrance ID from the URL params.
    const [value, setValue] = useState(0); // Tab selection state

    // Handler function to update the selected tab.
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <main>
       <div className="flex items-center w-full mr-32 justify-center">
            {/* Fragrance Image */}
            <div className="w-1/2 h-full flex items-center justify-center overflow-hidden rounded-lg">
                <img src={'/office_for_men.png'} alt="Fragrance" className="object-scale-down w-3/4" />
            </div>
            <div className="mb-32 mt-20 mr-5">
                {/* Fragrance Title and Brand */}
                <h1 className="font-bold text-6xl font-title">OFFICE FOR MEN</h1>
                <h2 className="text-xl text-gray-600 font-body pb-10 pl-1 pt-2">by Fragrance One</h2>
                {/* Notes Information */}
                <div className="bg-red-50 w-96 rounded-lg mx-auto outline shadow-2xl">
                    <div className="pl-1 text-center font-title text-2xl">Top Notes</div>
                    <div className="text-center font-body text-gray-500 pt-4 text-lg"> Ambroxan, Bergamot, Orris Root </div>
                    <div className="pl-1 pt-10 text-center font-title text-2xl">Middle Notes</div>
                    <div className="text-center font-body text-gray-500 pt-4 text-lg"> Woody Notes, Floral Notes, Ambergris, Amber, Jasmine </div>
                    <div className="pl-1 pt-10 text-center font-title text-2xl">Base Notes</div>
                    <div className="text-center font-body text-gray-500 pt-4 text-lg"> Woody Notes, Musk, Patchouli, Cashalox </div>
                </div>
            </div>
       </div>

       {/* Tabs Section */}
       <div className="mt-10 w-full border-t-2 font-body border-gray-500 bg-gray-100">
           <Box sx={{ width: '100%' }}>
               <Tabs value={value} onChange={handleChange} centered>
                   <Tab label="Description" sx={{ fontFamily: 'Roboto Condensed', fontSize: '1.1rem', fontWeight: 'md' }} />
                   <Tab label="Where to Buy" sx={{ fontFamily: 'Roboto Condensed', fontSize: '1.1rem', fontWeight: 'md' }} />
               </Tabs>

               <TabPanel value={value} index={0}>
                   {/* Description Section */}
                   <h1 className="text-center font-bold mt-10 font-title text-4xl">Description</h1>
                   <div className="text-center text-xl font-body mt-6 max-w-screen mx-auto px-4">
                       Office For Men by Fragrance One is a Woody Spicy fragrance for men. Office For Men was launched in 2019. The nose behind this fragrance is Alberto Morillas. Top notes are Ambroxan, Bergamot, and Orris Root; middle notes are Woody Notes, Floral Notes, Ambergris, Amber, and Jasmine; base notes are Woody Notes, Musk, Patchouli, and Cashalox.
                   </div>
                   <h3 className="text-4xl text-center font-title font-bold text-gray-800 mt-10">Perfumer</h3>
                   <h4 className="text-center text-2xl font-body mt-6">Alberto Morillas</h4>
               </TabPanel>

               <TabPanel value={value} index={1}>
                   {/* Empty "Where to Buy" Content */}
                   <div className="text-center text-xl font-body mt-6">Content will be added here later.</div>
               </TabPanel>
           </Box>
       </div>
    </main>
    );
};

export default EachFragrance;

/*
Documentation Summary:
- `EachFragrance` is a React functional component that displays detailed information about a specific fragrance.
- It retrieves the `fragranceId` from the URL using the `useParams` hook.
- The component includes:
  - An image of the fragrance.
  - The title, brand, and notes information (top, middle, base).
  - A tabbed section (`Description` and `Where to Buy`) with content for each tab.
- The `handleChange` function is used to manage tab selection.
- The `TabPanel` sub-component is used to render the content of each tab only when the corresponding tab is selected.
*/
