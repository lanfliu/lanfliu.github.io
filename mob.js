
  class Territory {
    constructor(name, income, cost, own, builtOn) {
      this.name = name;
      this.income = income;
      this.income25 = income * 25;
      this.cost = cost;
      this.own = own;
      this.builtOn = builtOn;
      this.cost25 = cost * 25;
      this.ratio = this.cost / this.income;
      this.html = `<a href="#" class="territory-link" data-territory-name="${this.name}">${this.name}</a>`;
    }
  }
  const MIN_WAIT = 1800;
  const MAX_WAIT = 2200;

  function getLandByName(landElements, name) {
    for (let i = 0; i < landElements.length; i++) {
      if (landElements[i].name === name) {
        return landElements[i];
      }
    }
    return null;
  }
  function getMoney() {
    const el = document.querySelector('span[data-header="cash"]');
    return el ? el.textContent.trim() : "0";
  }

  function pageContains(text) {
    return document.body.innerText.includes(text);
  }
  function waitRandom() {
    const delay = MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT);
    return new Promise(resolve => setTimeout(resolve, delay));
  }


    setInterval(() => {

        
        document.getElementById("territory-buttons")?.remove();
        document.getElementById("no-territories")?.remove();

        /* 🔎 Change this selector to match your game */
        const territories = document.querySelectorAll('[data-territory-id]');

        console.log("Found territories:", territories.length);

        if (territories.length === 0) {
            //create element with text "No territories found. Check selector." and append to body
            const noTerritories = document.createElement("div");
            noTerritories.id = "no-territories";
            noTerritories.textContent = "No territories found. Check selector.";
            noTerritories.style.position = "fixed";
            noTerritories.style.top = "10px";
            noTerritories.style.left = "10px";
            noTerritories.style.backgroundColor = "red";
            noTerritories.style.color = "white";
            noTerritories.style.padding = "10px";
            noTerritories.style.zIndex = "9999";
            document.body.prepend(noTerritories);
            return;
        }
        else{
            //remove element with id "no-territories" if it exists
            document.getElementById("no-territories")?.remove();
        }

        territory_mapping = {
            "Vacant Lot": 1,
            "Empty Storefront": 2,
            "Plaza": 3,
            "Seaside Lot": 4,
            "Empty Field": 5,
            "Overseas Lot": 6,

            "Newstand": 7,
            "Townhomes": 8,
            "Ristorante": 9,
            "Condo Complex": 10,
            "Luxury Hotel": 11,
            "Office Building": 12,
            "Skyscraper": 13,
            "Resort Casino": 14,
            "Shipyard": 15,
            "Yacht Harbor": 16,
            "Seaside Resort": 17,
            "Downtown Shopping Mall": 18,
            "Landmark Casino": 19,
            "Foreign Embassy": 20,
            "Helipad": 21,
            "Airport": 22
        };

        console.log("Mobsters United Analyzer script injected");

        for (var i = 1; i <=22; i++){
            document.getElementById("territory_" + i + "_amount").value = 25
        }

        /* split territories into 2 groups, first 6 and the rest */
        const landElements = new Array();
        const developmentElements = new Array();

        /* change to old style for loop with index */
        for (let i = 0; i < territories.length; i++) {
            const territory = territories[i];
            
            const name = territory.querySelector("h4").innerText.trim();
            infoElements = territory.querySelectorAll("p");
            infoLength = infoElements.length;

            incomeElement = infoElements[0];
            buildOnElement = infoLength == 3 ? null : infoElements[1]; 
            costElement = infoLength == 3 ? infoElements[1] : infoElements[2];
            ownElement = infoLength == 3 ? infoElements[2] : infoElements[3];

            /* gets the income value from innerText split by space ' ' and takes the last part as the income value  */
            const incomeValue = incomeElement.innerText.trim().split(' ').slice(-1)[0].replace(/,/g, '');
            const buildOnValue = buildOnElement ? buildOnElement.innerText.trim().split('Built on: ').slice(-1)[0].replace(/,/g, '') : "";
            const costValue = costElement.innerText.trim().split(' ').slice(-1)[0].replace(/,/g, '');
            const ownValue = ownElement.innerText.trim().split(' ').slice(-1)[0].replace(/,/g, '');

            /* creates Territory entity class with name, income, cost, own, builtOn, 25% cost */
            territoryEntity = new Territory(name, parseFloat(incomeValue), parseFloat(costValue), parseInt(ownValue), buildOnValue);

            if (i < 6) {
            landElements.push(territoryEntity);
            }
            else{
            developmentElements.push(territoryEntity);
            }
            console.log(`Territory: [${territoryEntity.name}], Income: [${territoryEntity.income25}], Build On: [${territoryEntity.builtOn}], Cost: [${territoryEntity.cost}], Own: [${territoryEntity.own}], 25 Cost: [${territoryEntity.cost25}]`);
        }

        /* sort landElements by ratio ascending */
        landElements.sort((a, b) => a.ratio - b.ratio);

        /* sort developmentElements by ratio ascending. if ratio is the same, sort by income25 descending */
        developmentElements.sort((a, b) => {
            if (a.ratio === b.ratio) {
            return b.income25 - a.income25;
            }
            return a.ratio - b.ratio;
        });


        /* console.table(landElements); */

        /* only print the first 6 results of developmentElements with name, builtOn, income25, cost25, ratio, own */
        console.table(developmentElements, ["name", "builtOn", "income25", "cost25", "ratio", "own"]);

        var developmentElementsTop4 = developmentElements.slice(0, 4);
        console.table(developmentElementsTop4, ["name", "builtOn", "income25", "cost25", "ratio", "own", "html"]);
        /* console.log("analysis completed"); */

        console.log(`money = ${getMoney()}`);

        ter = developmentElementsTop4[0];
        landId = territory_mapping[ter.builtOn];
        terId = territory_mapping[ter.name];
        console.log(`${ter.builtOn} (ID: ${landId}) -> ${ter.name} (ID: ${terId})`);


        const container = document.createElement("div");
        container.id = "territory-buttons";
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.gap = "15px";
        container.style.padding = "20px";

        document.body.prepend(container);

        //generate guid text and append to container
        const guid = document.createElement("p");
        guid.textContent = `${crypto.randomUUID()}`;
        container.appendChild(guid);

        if(landId != undefined){
            const button = document.createElement("button");
            //change the button style to normal button style
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5px";
            button.style.border = "1px solid #ccc";
            button.style.backgroundColor = "#f0f0f0";
            button.style.color = "#333";
            button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            button.style.transition = "background-color 0.3s ease";

            button.textContent = `Buy ${ter.builtOn} (ID: ${landId})`;
            button.onclick = () => {
                button.style.backgroundColor = "black";
                button.disabled = true;
                territoryBuy(landId);

            };
            container.appendChild(button);
        }

        if(terId != undefined){
            const button = document.createElement("button");
            //change the button style to normal button style
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5px";
            button.style.border = "1px solid #ccc";
            button.style.backgroundColor = "#f0f0f0";
            button.style.color = "#333";
            button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            button.style.transition = "background-color 0.3s ease";

            button.textContent = `Buy ${ter.name} (ID: ${terId})`;
            button.onclick = () => {
                button.style.backgroundColor = "black";
                button.disabled = true;
                territoryBuy(terId);
            };
            container.appendChild(button);
        }

    }, 1500);
