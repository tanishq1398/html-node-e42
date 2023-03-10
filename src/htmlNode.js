export function loadHtmlNode() {
  // Sets starting html for labels based on cytoscape zoom level
  function intializeCardHtml(cy, templates, query, staticZoomLevel) {
    let cyZoom = cy.zoom();
    for (let i = 0; i < templates.length; i++) {
      if (cyZoom >= templates[i].zoomRange[0] && cyZoom < templates[i].zoomRange[1]) {
        templates.htmlSet = true;
        setCardData(cy, templates[i].template, query, staticZoomLevel);
        return templates[i].zoomRange;
      }
    }
  }

  
  //added custom function for replacing loop data html
  function loopHtml(data) {
    let htmlString = `<div id="htmlLabel:#{data.id}" style=" width: 170px;height:auto"><div class="task-selected" >
    <span class="untrained-tab-tag">Untrained</span>
    <div class="selected-task-heading">
        <span id='${data.id}_${data.name}'>${data.name}</span>
        <span class="ms-auto"><img src="assets/images/more.svg"  class="node-menu" id="menu_${data.id}"></span>`

    if(data.showMenu){
      htmlString = htmlString +`<div class="menu-wrapper" id = "main-menu_${data.id}">
            <ul class="menu-items" id="menuitem_${data.id}">
              <li id = "edit_${data.id}" class="menu-list-item">Edit</li>
              <li id = "copy_${data.id}" class="menu-list-item">Copy</li>
              <li id = "copySubtree_${data.id}" class="menu-list-item">Copy Subtree</li>
              <li id = "delete_${data.id}" class="menu-list-item">Delete</li>
              <li id = "createChild_${data.id}" class="menu-list-item">Create Child</li>
              <li id = "paste_${data.id}" class="menu-list-item">Paste</li>
              <li id = "linkTask_${data.id}" class="menu-list-item">Link Task</li>
            </ul>
          </div>`
    }
    htmlString = htmlString +`</div>
    <span class="documents-tab-tag">Documents</span>
    <div class="selected-task-body">
      <div class="accordion-arrow-container">
        <div class="accordion-arrow-wrapper">
          <img src="assets/images/ellipse-chevron.png" style="position:relative;cursor:pointer">
          <div class="accordion-arrow">
          <img id = 'open_${data.id}' class="down-arrow" src="assets/images/down-arrow-vector.png" style="width:6px;cursor:pointer">
          </div>
        </div>
      </div>
    `;

        

  if(data.triggers && data.triggers.length){
    htmlString = htmlString + '<div class="trigger-list"><ul>'
      for (let index = 0; index < data.triggers.length; index++) {
        const element = data.triggers[index];
        htmlString = htmlString + `<li draggable="true" id="${element.obj_id}">${element.obj_id__name}</li>`
      }    
    htmlString = htmlString + '</ul></div><hr>'
  }
  htmlString = htmlString + `<div class="p-2 py-1 " ><div class="node-droppable" id='entity_${data.id}'>`
  
  if(data.entities && data.entities.length){
    for(let index = 0;index<data.entities.length;index++){
      const element = data.entities[index];
      htmlString = htmlString + `<div class="node-data add-collect-data m-0" id="${element.obj_id}">
                                  <span class='node-entity-text'>${element.obj_id__name}</span>
                                  </div>`
    }
  }
  // else{
    htmlString = htmlString + `</div><div class="blue-dashed-tag" id="entity_${data.id}" >
                  Drag <span class="add-collect-data">Entity</span>
                </div>`
  // }
  
  htmlString = htmlString + `</div><hr>`                            
  

htmlString = htmlString + `<div class="p-2 py-1" ><div class="node-droppable" id='api_${data.id}'>`
if(data.api && data.api.length){
  for(let index = 0;index<data.api.length;index++){
    const element = data.api[index];
    htmlString = htmlString + `<div class='add-api-data node-data m-0' id="${element.obj_id}">
                                <span class='node-entity-text'>${element.obj_id__name}</span>
                                </div>`
  }
}
// else{
  htmlString = htmlString +  `</div><div class="purple-dashed-tag" id="api_${data.id}">
                            Drag <span class='add-api-data'>API</span>
                          </div>`
// }      
htmlString = htmlString + `</div><hr>`                    

htmlString = htmlString + `<div class="p-2 py-1" id='datastore_${data.id}'>`
// if(data.datastore && data.datastore.length){
//   for(let index = 0;index<data.datastore.length;index++){
//     const element = data.datastore[index];
//     htmlString = htmlString + `<div class="orange-tag " id="${element.obj_id}">
//                                 <span class="white-text">${element.obj_id__name}</span>
//                                 </div>`
//   }
// }
// else{
  htmlString = htmlString +  `<div class="orange-dashed-tag" id="api_${data.id}">
                            Drag an Entity to make a decision?
                          </div>`
// }                                     
htmlString = htmlString + `</div><hr>`                          

return htmlString;
  }
  function loopDetails(data){
    let htmlString = `
    <div id="htmlLabel:#{data.id}" style=" width: 170px;height:auto">
      <div class="task-selected" >
        <span class="untrained-tab-tag">Untrained</span>
        <div class="selected-task-heading">
          <span>#{data.name}</span>
          <span class="ms-auto"><img src="assets/images/more.svg" class="node-menu" id="menu_${data.id}">
            
          </span>
          `

          if(data.showMenu){
            htmlString = htmlString +`<div class="menu-wrapper" id = "main-menu_${data.id}">
                  <ul class="menu-items" id="menuitem_${data.id}">
                    <li id = "edit_${data.id}" class="menu-list-item">Edit</li>
                    <li id = "copy_${data.id}" class="menu-list-item">Copy</li>
                    <li id = "copySubtree_${data.id}" class="menu-list-item">Copy Subtree</li>
                    <li id = "delete_${data.id}" class="menu-list-item">Delete</li>
                    <li id = "createChild_${data.id}" class="menu-list-item">Create Child</li>
                    <li id = "paste_${data.id}" class="menu-list-item">Paste</li>
                    <li id = "linkTask_${data.id}" class="menu-list-item">Link Task</li>
                  </ul>
                </div>`
          }
          htmlString = htmlString +`</div>
          <span class="documents-tab-tag">Documents</span>
        <div class="selected-task-body">
          <div class="accordion-arrow-container">
            <div class="accordion-arrow-wrapper">
              <img src="assets/images/ellipse-chevron.png" style="position:relative;">
              <div class="accordion-arrow">
                <img id = 'close_${data.id}' class="down-arrow" src="assets/images/close-chevron.png" style="width:6px;cursor:pointer;">
              </div>
            </div>
          </div>
        
          <div class='trigger-list'>
            <span class='node-data add-trigger'>+ Trigger
      `

    if(data.triggers && data.triggers.length){
        for (let index = 0; index < data.triggers.length; index++) {
          const element = data.triggers[index];
          htmlString = htmlString + ` <span id="${element.obj_id}">${element.obj_id__name}</span>`
        }    
    }
    htmlString = htmlString + `</span>
    <span class='node-data add-collect-data'> + Collect Data`

    if(data.entities && data.entities.length){
      for (let index = 0; index < data.entities.length; index++) {
        const element = data.entities[index];
        htmlString = htmlString + ` <span id="${element.obj_id}">(${element.obj_id__name})</span>`
      }    
    }

    htmlString = htmlString + `</span>
    <span class='node-data  add-api-data'> + Call API</span>`

    htmlString = htmlString + `</span>
    <span class='node-data  add-store-data'> + Data Store</span>`
    
    htmlString = htmlString + `</span>
    <span class='node-data add-decision-data'> + Make Decision on Entity</span>`

    htmlString = htmlString +` </div>
    <hr></div></div>`

    
    return htmlString;
  }
  // Replaces string targets with cytoscape node data
  function getCardHtml(data, cardData,cy) {
    let htmlString;
    if(data.pk){
      if(data.showDetails){
        htmlString = loopDetails(data)
      }else{
        htmlString = loopHtml(data);
      }
    }
    else{
      htmlString = ''
    }
    let dataProp;

    let final = htmlString.replaceAll(/#{.*?}/g, (target) => {
      // '#{data.prop}' => 'prop'
      dataProp = target.substring('#{data.'.length, target.length - 1);
      return data[dataProp];
    });
    return final;
  }

  // Updates html label for node
  function updateCardData(cy, cardData, query) {
    cy.nodes(query).forEach(function (ele) {
      if (ele.data('htmlNode')) {
        ele.data('htmlNode').innerHTML = getCardHtml(ele.data(), cardData,cy);
      }
    });
    // console.log("updatinghtml");
    // cy.on('render',function(e){
    //   cy.emit('render')
    // })
  }

  // Call to nodeHtmlLabel, displays html
  function setCardData(cy, cardData, query, staticZoomLevel) {
    console.log(query);
    cy.nodeHtmlLabel([
      {
        query: query, // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: cardData.cssClass, // any classes will be as attribute of <div> container for every title
        staticZoomLevel: staticZoomLevel,
        tpl(data) {
          return getCardHtml(data, cardData,cy);
        },
      },
    ]);
   
  }

  // Removes html labels for corresponding cytoscape query
  function removeHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;

    for (let i = 0; i < length; i++) {
      try {
        if (cyNodes[i].data('htmlNode') != undefined) {
          cyNodes[i].data('htmlNode').parentElement.style.visibility = 'hidden';
          return;
        }
      } catch {
        console.warn('cytoscape.js-html-node: unable to hide html');
      }
    }
  }

  // Removes html labels for corresponding cytoscape query
  function showHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;

    for (let i = 0; i < length; i++) {
      try {
        if (cyNodes[i].data('htmlNode') != undefined) {
          cyNodes[i].data('htmlNode').parentElement.style.visibility = 'visible';
          return;
        }
      } catch {
        console.warn('cytoscape.js-html-node: unable to show html');
      }
    }
  }

  // Set html labels based on templates, sets cytoscape zoom to change html based on cytoscape zoom level
  function setTemplate(cy, templates, query, nodeStyle, staticZoomLevel) {
    let curZoomRange = intializeCardHtml(cy, templates, query, staticZoomLevel);
    let minZoom = templates[0].zoomRange[0];
    let htmlRemoved = false;
    let altColorSet = false;
    let i;

    cy.on('add', query, function (evt) {
      // Using set timeout with time = 0 allows html to finish rendering
      setTimeout(function () {
        let curretnIndex = i;

        if (altColorSet && nodeStyle != undefined) {
          cy.batch(() => {
            evt.target.addClass(nodeStyle.alt);
          });

          removeHtmlLabels(cy, `node#${evt.target.id()}`);
        } else if (nodeStyle != undefined) {
          cy.batch(() => {
            evt.target.addClass(nodeStyle.base);
          });

          if (templates[curretnIndex] != undefined) {
            updateCardData(cy, templates[curretnIndex].template, `node#${evt.target.id()}`);
          }
        }
      }, 0);
    });

    cy.on('zoom', function (evt) {
      let zoom = cy.zoom();

      if (zoom < minZoom && !htmlRemoved) {
        removeHtmlLabels(cy, query);
        htmlRemoved = true;
        curZoomRange = [0, templates[0].zoomRange[0]];

        if (nodeStyle != undefined) {
          cy.batch(() => {
            cy.$(query).addClass(nodeStyle.alt);
            cy.$(query).removeClass(nodeStyle.base);
          });
        }
        altColorSet = true;
        // Zoom level is new range, update html for node
      } else if (zoom < curZoomRange[0] || zoom > curZoomRange[1]) {
        for (i = 0; i < templates.length; i++) {
          if (zoom > templates[i].zoomRange[0] && zoom < templates[i].zoomRange[1]) {
            updateCardData(cy, templates[i].template, query);

            curZoomRange = templates[i].zoomRange;

            if (altColorSet) {
              if (nodeStyle != undefined) {
                cy.batch(() => {
                  cy.$(query).removeClass(nodeStyle.alt);
                  cy.$(query).addClass(nodeStyle.base);
                });
              }

              altColorSet = false;

              showHtmlLabels(cy, query);

              if (templates.htmlSet != true) {
                intializeCardHtml(cy, templates, query, staticZoomLevel);
                templates.htmlSet = true;
              }
            }
            htmlRemoved = false;
            break;
          }
        }
      }
    });
    // cy.emit('zoom');
  }

  function createHtmlNode(cytoscape, cy, templates) {
    try {
      if (!cy.__proto__.nodeHtmlLabel) {
        var nodeHtmlLabel = require('./cytoscape-node-html-label');
        nodeHtmlLabel(cytoscape);
      }

      for (let key in templates) {
        setTemplate(
          cy,
          templates[key].template,
          templates[key].query,
          templates[key].nodeStyle,
          templates[key].staticZoomLevel
        );
      }
    } catch (error) {
      console.warn('cytoscape.js-html-node: ', error);
    }
  }
  return {
    createHtmlNode: createHtmlNode,
  };
}
