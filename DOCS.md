#   Date Started: Saturday 1st February 2025


#   About
+   From Briyah from Bara --- to create
+   Signon --- style
+   Tzelem --- image
    =   Bri + gnon + em
+   Might Change it though

#   Aim
this app is a library that contains templates for creating the generic web layout and content needed for
creation and design for the different pages that consist a website.



#   Goals
+   Create content in each content type. E.g. Article, CV, Shop, FooterBar, etc
+   Enable Main page to select and load the appropriate content from their directory into the page.
+   In main page, add functionality to change layouts; likewise in each Page type.
    -   E.g. for menu, they have different layouts.
    ##  Wed-05-02-2025  
+   The Server-side code is separate. This means PHP will not be embedded into the HTML.    Instead, JS will be used
    to request from PHP endpoints to appropriately populate the DOM of the target Content.



#   Procedure
+   the main.html is the access point.
    -   The main script needed to create and insert items into the content part of the page, and the base style
    for the page are added here.
+   The javascript is made in such a way that it requests the requested html and inserts it into the appropriate content
    area.
+   The styling contains global variables and base styles.
+   




#   Learnt

##  Date: Wed-05-Feb-2025
+   Converting String to HTML and inserting in Current DOM
    -   M1:
    ```
        str = <h1>It is I</h1>;
        var dom = document.createElement('div');
	    dom.innerHTML = str;
	    return dom;
    ```
    -   M2: Better = - It creates a brand new document object
    ```
    	var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');

        return doc.body;
    ```
    Note the body is returned not the document.

##  Date: Thurs-06-Feb-2025
+   Convert HTMLCollection to Array:
    -   var arr = Array.prototype.slice.call( htmlCollection )
    -   var arr = [].slice.call(htmlCollection);
    -   var arr = Array.from(htmlCollection);
    -   Array.from(htmlCollection)
    -   let arry = [...htmlCollection]

+   Consider This Method of Converting a String to HTML and inserting its content into and element in the current DOM:
    This way was better than modifying the targetElement's innerHTML, because the latter would add a '#documentfragment' to the innerHTML.
    The document fragemnt has some limitations.
    Specifically when I tried to get all the elements that had the class 'navbar-item' --- for some reason, the HTMLCollection returned could not be modified.
    But I found out that a DocumentFragment object's children can be looped through.
    But its not convenient.
    ```
    htmlContent = htmlContent.trim();
    const newDoc = Parser.parseFromString(htmlContent, "text/html");
    targetElement.appendChild(newDoc.body);
    ```


##  Date: Sunday-09-Feb-2025
+   There was this issue concerning the HTML strings I converted and inserted into my current DOM. The issue was that the elements of that string could not be accessed outside the scope of the function I loadd them from.
    -   The reason for this issue is this: the variable.
    -   The first method used, M1:
            const newDoc = Parser.parseFromString(htmlContent, "text/html");
            targetElement.appendChild(newDoc.body);
    -   and the second method, M2:
            targetElement.innerHTML = htmlContent;
    -   but both had the same issue: the definition of the variable `htmlContent`, and the way I assigned it.
    -   Because htmlContent was defined without any modifier such as `let` or `var`, it defaulted to `var`. When `var` is used, anytime that variable is passed into a function, it is th ereference of that variable that is passed in. This means once that variable goes out of scope, the reference becomes invalid, and the value undefined.
    -   This is why I could not access the elements outside the functions where I load the contents.
+   Because of this, all the code to add hooks to the various elements and such had to be done inside the function I used to load them into the current DOM.
+   But the solution for the above issue is unique for the M2.
    -   I could have done:
        targetElement.innerHTML += htmlContent.
        This would have created a copy of htmlContent that is not restricted by the current funciton's scope.
+   But the solution for both:
    -   After htmlContent is defined in the fetch() execution flow, where I did `htmlContent = htmlContent.trim()` to remove leading and trainling whitespaces, I could have defined it this way instead
    `let htmlContentCopy = htmlContent.trim()` --- note that it is not var, lest it take a reference to htmlContent.trim().
+   These solutions are applied in later versions of the `PageControl.js`