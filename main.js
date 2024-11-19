// Elements from document
const searchForm = document.querySelector(".main__form");
const searchInput = document.querySelector(".search-input");
const columns = document.querySelectorAll(".photos__column");
// unsplash data
const API = "https://api.unsplash.com";
const ACCESSKEY = "B6fBhlYXIK66uEGK90ZI3TU7l5HCpRY__wmhhKRroR8";
const urlParams = "page=1&per_page=30&order_by=lates&content_filter=high&";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value;
    getPhotos(query).then(displayPhotos);
    searchForm.reset();
});

async function getPhotos(query) {
    const response = await fetch(
        `${API}/search/photos?${urlParams}query=${query}`,
        {
            method: "GET",
            headers: {
                "Accept-Version": "v1",
                Authorization: `Client-ID ${ACCESSKEY}`,
            },
        }
    );
    if (!response.ok) {
        console.error("Error: Qandaydir xatolik yuz berdi");
        return null;
    }
    const data = await response.json();
    console.log(data.results);
    return data.results;
}
function displayPhotos(photos) {
    columns.forEach((column) => (column.innerHTML = ""));
    photos.forEach((photo, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";
        imgContainer.innerHTML = `
            <a href="${photo.links.download}" target="_blank">
                <img 
                    src="${photo.urls.small}" 
                    alt"${photo.alt_description}" 
                    title="Photo by ${photo.user.name}"
                />
            </a>      
        `;
        columns[index % 3].append(imgContainer);
    });
}
