"use strict"

$(init);

function init() {
    renderProtfolio();
}

function renderProtfolio() {
    var projs = getGprojs();
    var strHTML = projs.map(function (proj) {
        return ` <div class="col-md-4 col-sm-6 portfolio-item" onClick="onRenderModal('${proj.id}')">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src='${proj.img}' alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${proj.name}</h4>
      <p class="text-muted">${proj.title}</p>
    </div>
  </div>`
    })
    $('.my-proj').html(strHTML);
}

function onRenderModal(projId) {
    console.log('projId',projId);
    var projs = getGprojs();
    var proj = projs.find(proj => proj.id === projId)
        var strHTML = ` 
        <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src='${proj.img}' >
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${proj.publishedAt} 2017</li>
                  <li>Client: Threads</li>
                  <li>Category: ${proj.labels}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                
                  <i class="fa fa-times"></i>
                  Close Project</button><br/>
                  <button class="btn btn-primary my-5" onClick="window.open('${proj.url}')" >
                
                  <i class="fa fa-times"></i>
                  check it Out</button>
        `
    
    $('.modal-body').html(strHTML);
}