/**
 *      Date: Wed-05-02-2025
 *      This has the JS code to load pages into the DOM of the Main.html
 *      It also provides the code that enables navigation, which utilizes the Page Loading function.
 */
const Parser = new DOMParser();
var g_TopNavbarItemsStore;
var cssChangeClassName = "resized";
var removed = false;

var LoadLayoutContent = (layoutTargetElementID, sourcePath)=>{
    var targetElement = document.getElementById(String(layoutTargetElementID));
    fetch(String(sourcePath))
        .then(response=> response.text())
        .then(htmlContent => {
            htmlContent = htmlContent.trim();
            // console.log("HTML: ", htmlContent);
            var newDoc = Parser.parseFromString(htmlContent, "text/html");
            targetElement.appendChild(newDoc.querySelector("div"));

            //  OR
            /**
             * targetElement.innerHTML = htmlContent;
             */

            //  Now Register the Nav Links
            // console.log(targetElement);
            var navLinkItemsRef = targetElement.getElementsByClassName("NavbarLinkItem");
            // console.log(navLinkItemsRef);
            for (var i=0; i < navLinkItemsRef.length; ++i)
            {
                //  By changing var to let, the parameter passed in does not take a reference but a copy.
                let linkText = navLinkItemsRef[i].innerText;
                // console.log(linkText);
                navLinkItemsRef[i].onclick = (event)=>{
                    NavLinkItemCallback(linkText);
                };
            }

            //  Register Theme Button and Topbar Toggle Button
            if (layoutTargetElementID.includes("Top")){
                
                var themeButtonRef = document.getElementById("ThemeButton");
                // console.log(themeButtonRef);
                //  Register Theme Button
                themeButtonRef.onclick = (event)=>{
                    ButtonToggleTheme(themeButtonRef);
                }
                LoadIcon(themeButtonRef);

                //  Register TopNavbar Toggle Button
                var topNavbarToggleButtonRef = document.getElementById("TopNavbarToggleButton");
                var topNavbarItemsRef = document.getElementById("TopNavbarItems");
                var topNavbarContentRef = document.getElementById("TopNavbarContent");

                //  Register Toggle Button Callback
                topNavbarToggleButtonRef.onclick = (event)=>{
                    ButtonToggleTopbar(topNavbarToggleButtonRef, topNavbarItemsRef, topNavbarContentRef, navLinkItemsRef);
                }
                LoadTopbarButton(topNavbarToggleButtonRef);
                TopbarOnResize(topNavbarToggleButtonRef, topNavbarItemsRef, topNavbarContentRef, navLinkItemsRef);
                
                //  Register OnResize Event for DOM Body
                var bodyRef = document.getElementById("MainBody");

                bodyRef.onresize = (event)=>{
                    TopbarOnResize(topNavbarToggleButtonRef, topNavbarItemsRef, topNavbarContentRef, navLinkItemsRef);
                };
            }
        });
};

const LoadMainContent = (mainTargetElementID, sourcePath)=>{
    var targetElement = document.getElementById(String(mainTargetElementID));
    fetch(String(sourcePath))
        .then(response=> response.text())
        .then(htmlContent => {
            htmlContent = htmlContent.trim();
            var newDoc = Parser.parseFromString(htmlContent, "text/html");
            targetElement.appendChild(newDoc.querySelector("div"));;
            //  OR
            /**
             * targetElement.innerHTML = htmlContent;
             */
            //  Register Body Links that Navigate like those in the Nav Bars
            linkItemsRef = targetElement.getElementsByClassName("MainBodyNavLink");
            for (var i=0; i < linkItemsRef.length; ++i)
            {
                //  By changing var to let, the parameter passed in does not take a reference but a copy.
                let linkText = linkItemsRef[i].innerText;
                // console.log(linkText);
                linkItemsRef[i].onclick = (event)=>{
                    NavLinkItemCallback(linkText);
                };
            }

        });
}



const CreateLayout = () =>
{
    const layoutType = "Layout1";
    
    LoadLayoutContent("TopNavbarHTML",
        "../core/client_side/navbars/topnavbar/topnavbar.html",
    );
    
    LoadLayoutContent("BottomNavbarHTML",
        "../core/client_side/navbars/bottomnavbar/bottomnavbar.html",
    );

    LoadLayoutContent("SideNavbarHTML",
        "../core/client_side/navbars/sidenavbar/sidenavbar.html",
    );

    // SavePageVariable(g_CurrentLayoutID, layoutType);

};

const InitPageContent = () =>
{
    var pageContentType = String(GetPageVariable(g_CurrentPageID));
    
    if (pageContentType == "" || pageContentType == null)
    {
        pageContentType = "Home";
        LoadMainContent("MainContentHTML",
            "./content/home.html"
        );
        return;
    }

    ChangePageContent(pageContentType);
    
    SavePageVariable(g_CurrentPageID, pageContentType);
};

const ChangePageContent = (contentName) =>
{
    //  Clear the Current Content
    var MainContentRef = document.getElementById("MainContentHTML");
    MainContentRef.innerHTML = "";

    LoadMainContent("MainContentHTML",
        "./content/" + String(contentName) + ".html"
    );

    SavePageVariable(g_CurrentPageID, contentName);
};

/**
 * Register Navigation Links to Change Page Content
*/

const NavLinkItemCallback = (contentName) =>
{
    //  Strip or Trim and Remove Spaces
    contentName = contentName.trim();
    contentName = contentName.replace(" ", "");
    //  Can do preprocessing on name
    ChangePageContent(contentName);

}

/**
 * #########################################################
 *  Theme Button
 */

// var temp = document.getElementById("TopbarIconsTemplate");
// console.log("The Temp: ", temp);
var iconsTemplateElement = document.getElementById("TopbarIconsTemplate").content;
// console.log("Icons Template: ", iconsTemplateElement);
var htmlContentCopy = document.importNode(iconsTemplateElement, true);


function switchToDarkTheme(themeButtonRef)
{
    document.body.classList.replace("LightBG", "DarkBG");
    // if (document.body.classList.contains("lightBG")){
    //     document.body.classList.remove("lightBG");
    // }
    //  Change Icon
    var iconElement = htmlContentCopy.getElementById("ThemeIcon-Sun").outerHTML;
    themeButtonRef.innerHTML = iconElement;
    localStorage.setItem("dark_theme", true);
    // console.log("Switched to dark! " + localStorage.getItem("dark_theme"));
}

function switchToLightTheme(themeButtonRef)
{
    // document.body.classList.add("lightBG");
    document.body.classList.replace("DarkBG","LightBG");
    // if (document.body.classList.contains("darkBG")){
    //     document.body.classList.remove("darkBG");
    // }
    //  Change Icon
    var iconElement = htmlContentCopy.getElementById("ThemeIcon-Moon").outerHTML;
    themeButtonRef.innerHTML = iconElement;
    localStorage.setItem("dark_theme", false);
    // console.log("Switched to light! " + localStorage.getItem("dark_theme"));
}

//  Hook
function ButtonToggleTheme(themeButtonRef)
{
    //  If currently light theme
    if (document.body.classList.contains("LightBG") && localStorage.getItem("dark_theme")){
        document.body.classList.remove("LightBG");  //  switch off
        document.body.classList.add("DarkBG");   //  switch on
        //  Change Icon
        var iconElement = htmlContentCopy.getElementById("ThemeIcon-Sun").outerHTML;
        themeButtonRef.innerHTML = iconElement;
        localStorage.setItem("dark_theme", true);
    }
    else    //  Else, it's dark theme, so change it
    {
        document.body.classList.remove("DarkBG");   //    switch off
        document.body.classList.add("LightBG");  //  switch on
        //  Change Icon
        var iconElement = htmlContentCopy.getElementById("ThemeIcon-Moon").outerHTML;
        themeButtonRef.innerHTML = iconElement;
        localStorage.setItem("dark_theme", false);
    }
    // console.log("Toggled! " + localStorage.getItem("dark_theme"));
}

function LoadIcon(themeButtonRef)
{
    // console.log(localStorage.getItem("dark_theme"));
    /*for (var i=0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        console.log("Key: " + key + ", Val: " + String(localStorage.getItem(key)));
    }*/
    if (localStorage.getItem("dark_theme") == "true") //  If true
    {
        switchToDarkTheme(themeButtonRef);
    }
    else if (localStorage.getItem("dark_theme") == "false")
    {
        switchToLightTheme(themeButtonRef);
    }
    else
    {    
        switchToLightTheme(themeButtonRef);
    }
}

//  #########################################################

/**
 * ##########################################################
 *  TopNavbar Toggle Button
 */

function TopbarOnResize(topNavbarToggleButtonRef, topNavbarItemsRef, topNavbarContentRef, navLinkItemsRef)
{
    var bodyElement = document.querySelector("body");
    var bodyWidth = bodyElement.offsetWidth;
    if (bodyWidth <= 768 && removed == false){
        //  If not empty
        if (topNavbarItemsRef != null){
            //  Get the top bar nav items container and store them
            g_TopNavbarItemsStore = topNavbarItemsRef.outerHTML;
            console.log("Store: ", g_TopNavbarItemsStore);
            //  then remove it from the DOM.
            topNavbarItemsRef.remove();
            // console.log("sth: ", sth);
            
            //  Finally, unhide the topbar toggle button
            topNavbarToggleButtonRef.classList.remove("hidden");
            //  and define the resized  class
            topNavbarContentRef.classList.add(cssChangeClassName);

            //  If the toggle button is clicked to show the nav-items
            //  that is, the open class no more exists.
            if (topNavbarToggleButtonRef.classList.contains("open") != true){
                AddTopbarNavItems(topNavbarContentRef, navLinkItemsRef);    //  Add them;
            }
            removed = true;
        }
    }
    else if (bodyWidth > 768){
        // if (topNavbarItemsRef != null) {return;}
        if (removed == true){
            //  then re-add it
            // topNavbarContentRef.innerHTML += g_TopNavbarItemsStore;
            AddTopbarNavItems(topNavbarContentRef, navLinkItemsRef);
            //  Finally, hide the topbar toggle button
            topNavbarToggleButtonRef.classList.add("hidden");
            //  Remove the resized class
            topNavbarContentRef.classList.remove(cssChangeClassName);
            
            removed = false;
        }
    }

    //  DONE. When the topbar open button is clicked
    //  this `addNavItems` runs
}

function AddTopbarNavItems(topNavbarContentRef, navLinkItemsRef)
{
    //  Get nav items' container element
    var navItemsParent = topNavbarContentRef;
    //  append the child
    navItemsParent.innerHTML += g_TopNavbarItemsStore;
    //  Add class resized to change CSS styling
    navItemsParent.classList.add(cssChangeClassName);

    console.log("NavLink Items Lenght: ", navLinkItemsRef.length);

    for (var i=0; i < navLinkItemsRef.length; ++i)
    {
        //  By changing var to let, the parameter passed in does not take a reference but a copy.
        let linkText = navLinkItemsRef[i].innerText;
        // console.log(linkText);
        navLinkItemsRef[i].onclick = (event)=>{
            NavLinkItemCallback(linkText);
        };
    }

}

function RemoveTopbarNavItems(topNavbarItemsRef)
{
    var navItems =topNavbarItemsRef;
    //  Remove it
    navItems.remove();
    //  Don't Remove styling class
    // document.getElementById("TopNavbarContent").classList.remove(cssChangeClassName);
}

/** Date: Mon-3-Jun-2024 */
function ButtonToggleTopbar(topNavbarToggleButtonRef,topNavbarItemsRef, topNavbarContentRef, navLinkItemsRef)
{
    var iconsTemplateElement = document.getElementById("TopbarIconsTemplate").content;
    var htmlContentCopy = document.importNode(iconsTemplateElement, true);

    var iconElementContainer = topNavbarToggleButtonRef;

    var open_icon = htmlContentCopy.getElementById("TopbarIcon-Open");
    var close_icon = htmlContentCopy.getElementById("TopbarIcon-Close");

    //  If the icon element is clicked when the default open-icon is on
    //  replace with close icon
    if (iconElementContainer.classList.contains("open")){
        iconElementContainer.classList.toggle("open");
        iconElementContainer.innerHTML = close_icon.outerHTML;
        AddTopbarNavItems(topNavbarContentRef, navLinkItemsRef);

    }
    else{
        iconElementContainer.classList.toggle("open");
        iconElementContainer.innerHTML = open_icon.outerHTML; 
        RemoveTopbarNavItems(topNavbarItemsRef);   
    }
    // console.log("resized");

}

function LoadTopbarButton(topNavbarToggleButtonRef)
{
    var iconsTemplateElement = document.getElementById("TopbarIconsTemplate").content;
    var htmlContentCopy = document.importNode(iconsTemplateElement, true);

    var iconElement = htmlContentCopy.getElementById("TopbarIcon-Open").outerHTML;
    // console.log(iconElement);
    topNavbarToggleButtonRef.innerHTML = iconElement;
}
/*######################################################*/




// ##############################################################

function main()
{
    CreateLayout();
    InitPageContent();
}


main();