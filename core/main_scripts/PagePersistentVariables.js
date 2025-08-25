/**
 *  This initializes all the global persistenet variables
 *  and defines the functions used to modify them. 
 *  
*/

const g_CurrentLayoutID = "currentLayoutID";
const g_CurrentPageID = "currentPageID";
const g_CurrentSideNavbarID = "sideNavbarID";


const SavePageVariable = (id, data) =>
{
    localStorage.setItem(String(id), data);
}

const GetPageVariable = (id) =>
{
    return localStorage.getItem(String(id));
}