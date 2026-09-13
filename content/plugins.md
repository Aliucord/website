---
title: "Plugins"
date: 2026-08-30T20:23:52-05:00
draft: false
body_class: plugins
custom_css: css/plugins-page.css
params:
    description: "Our 349+ plugins power Aliucord and extend Discord's functionality"
---

<div class="md-text-field md-search-field">
    <svg class="md-search-field__icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <input type=search id="plugin-search" placeholder=" " size="50">
    <label for=plugin-search>Search plugins...</label>
</div>

<div id="plugin-list" class=md-masonry>
</div>

<script>
    document.querySelector("main > article").className = "";
    fetch("https://plugins.aliucord.com/manifest.json").then(r => r.json()).then(json => {
        for(i=0;i<json.length;i++) {
            let article = document.createElement("article");
            let content = document.createElement("div");
            let name = document.createElement("h1");
            let author = document.createElement("p");
            let version = document.createElement("p");
            let description = document.createElement("p");
            let divrepo = document.createElement("div");
            let repo = document.createElement("a");
            
            name.insertAdjacentText("beforeend", json[i].name);
            author.insertAdjacentText("beforeend", json[i].authors[0].name);
            version.insertAdjacentText("beforeend", json[i].version);
            description.insertAdjacentText("beforeend", json[i].description);
            repo.insertAdjacentText("beforeend", "Github URL");
            repo.setAttribute("href", json[i].repoUrl);
            
            divrepo.insertAdjacentElement("beforeend", repo);
            divrepo.setAttribute("class", "md-card__actions");
            author.setAttribute("class", "md-card__supporting-text");
            version.setAttribute("class", "md-card__supporting-text");
            
            content.insertAdjacentElement("beforeend", name);
            content.insertAdjacentElement("beforeend", author);
            content.insertAdjacentElement("beforeend", version);
            content.insertAdjacentElement("beforeend", description);
            content.insertAdjacentElement("beforeend", divrepo);
            content.setAttribute("class", "md-card__content");
            article.insertAdjacentElement("beforeend", content);
            article.setAttribute("class", "md-card md-card-filled");
            document.querySelector("#plugin-list").insertAdjacentElement("beforeend", article);
        }
    });
    document.querySelector("#plugin-search").addEventListener("input", function (e) {
        let plugins = document.querySelectorAll("#plugin-list > article");
        for(i=0;i<plugins.length;i++) {
            plugins[i].style.display = "none";
            if(e.target.value.length == 0) plugins[i].style.display = "block";
            if(plugins[i].firstElementChild.firstElementChild.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                plugins[i].style.display = "block";
            }
        }
    });
</script>
