"use stict";

(function () {

    const url = "https://api.cdnjs.com/libraries";
    // let libraries = axios.get(url)
    //         .then(res => res.data.results)
    //         .then(results => results.map(res => axios.get(`${url}/${res.name}`))
    //                         .reduce((promiseChain, currentTask) => {
    //                             return promiseChain.then(chainResults => {
    //                                 return currentTask.then(currentResult => [
    //                                     ...chainResults, currentResult
    //                                 ]);
    //                             })
    //             }));
        
        

    let clicked = (name, link) => {
        let script = document.createElement("script");
        script.setAttribute("src", link);
        document.body.appendChild(script);

        console.log(`${name} Loaded`);
    };

    let copy = txt => {
        let el = document.createElement("input");
        let place = document.querySelector(".placeholder");
        place.appendChild(el);
        el.value = txt;
        el.select();
        document.execCommand("copy");
        place.removeChild(el);
    }

    window.clicked = clicked;
    window.copy = copy;

    let compose = function (fn1, fn2) {
        return function (x) {
            return fn1(fn2(x));
        };
    };

    let template = data => `
        <div class="items-container">
                <div class="items-container__title" onclick="clicked('${data.title}', '${data.description}')">
                    <h2>${data.title}</h2>
                </div>
                <div class="items-container__description" title="Copy" onclick="copy('${data.description}')">
                     <p>${data.description}</p>
                </div>
        </div>
    `;

    // side effects

    let hookTo = (el, data) => el.innerHTML = data;

    document.querySelector(".main-container__query").addEventListener("input", function (ev) {
        
        if (this.value.length > 0) {
            axios.get(`${url}?search=${this.value}`)
                .then(res => res.data.results)
                .then(arr => {
                    let html = arr.map(item => ({
                        title: item.name,
                        description: item.latest
                    })).map(template)
                    .reduce((acc, it) => acc + it, "");

                    hookTo(document.querySelector(".items"), html);
                });
           
        }
        
        
    });
})();