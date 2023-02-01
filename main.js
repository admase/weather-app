const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".code-section .cities");

const apiKey = 'eb0354b8c1b10e6d1c212672c6ac7452';

// Get Form Input
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputVal = input.value;

    const cityList = list.querySelectorAll(".code-section .city");
    const cityListArray = Array.from(cityList);

    if (cityListArray.length > 0)
    {
        const filterArr = cityListArray.filter((el) => {
            let city = "";

            if (inputVal.includes(","))
            {
                if (inputVal.split(",")[1].length > 2)
                {
                    inputVal = inputVal.split(",")[0];
                    city = el.querySelector(".city-name span").textContent.toLowerCase();
                }
                else
                {
                    city = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            }
            else
            {
                city = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return city == inputVal.toLowerCase();
        });

        if (filterArr.length > 0)
        {
            msg.textContent = `You already know the weather for ${
                filteredArray[0].querySelector(".city-name span").textContent
              } ...otherwise be more specific by providing the country code as well 😉`;
              form.reset();
              input.focus();
              return;
        }
    }

    // Api call
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
	.then(response => response.json())
	.then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${icon}" alt="${weather[0]['description']}">
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
    })
	.catch(() => {
        msg.textContent = "Please search for a valid city";
    });

    msg.textContent = "";
    form.reset();
    input.focus();
});