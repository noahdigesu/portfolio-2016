$(document).ready(function () {
    $('#searchField').blur(function () {
        $("#title").css("transform", "translateY(0)");
        $("#search").css("width", "100%");
        $("#searchField").val("");
        $("#searchField").css({
            "width": "0%",
            "padding": "15px 22px",
            "cursor": "pointer"
        });
    })
        .focus(function () {
            $("#title").css("transform", "translateY(-70%)");
            $("#search").css("width", "200%");
            $("#searchField").css({
                "width": "100%",
                "padding": "15px 35px 15px 25px",
                "cursor": "text"
            });
        });
});

window.onload = choosePic;

var myPics = new Array(
    "images/undraw_Mobile_app_re_catg.svg",
    "images/undraw_my_app_re_gxtj.svg",
    "images/undraw_Social_life_re_x7t5.svg"
);

function choosePic() {
    let randomNum = Math.floor(Math.random() * myPics.length);
    document.getElementById("illustration").src = myPics[randomNum];
}

$("#searchField").keyup(function (event) {
    if (event.keyCode === 13) {
        let url = getUrl();

        removePreviousPics();

        // let pics = getPics(url);
        getPics(url);
    }
});

function removePreviousPics() {
    let kiddos = $("#fetchedImages").children();
    if (kiddos.length >= 1) {
        for (let i = 0; i < kiddos.length; i++) {
            kiddos[i].remove();
        }
    }
}

function getUrl() {
    let url = $("#searchField").val();

    let regex = new RegExp("https://www.instagram.com/p/.........../.*");
    let regex2 = new RegExp("http://www.instagram.com/p/.........../.*");
    let regex3 = new RegExp("www.instagram.com/p/.........../.*");
    let regex4 = new RegExp("instagram.com/p/.........../.*");

    if (regex.test(url)) {
        url = url.substring(0, 40);
    } else if (regex2.test(ulr)) {
        url = url.substring(0, 39);
    } else if (regex3.test(ulr)) {
        url = "https://" + url.substring(0, 32);
    } else if (regex4.test(ulr)) {
        url = "https://www." + url.substring(0, 28);
    } else {
        $("#alert").text("Invalid URL, please use the following form: <i>https://www.instagram.com/p/CKgQlvHAPTh/</i>");
        return null; //! A FAIRE
    }

    return url + "?__a=1";
}

function getPics(url) {
    let pics = [];

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $("#dl").text("DOWNLOAD");
            $("#dl").attr("href", "javascript:void(0);");
            $("#dl").attr("target", "_self");
            $("#title").css("transform", "translateY(0)");
            $("#search").css("width", "100%");
            $("#searchField").val("");
            $("#searchField").css({
                "width": "0%",
                "padding": "15px 22px",
                "cursor": "pointer"
            });
            $("#searchField").blur();

            let fetchedData;
            if (data.graphql.shortcode_media.edge_sidecar_to_children !== undefined) {
                fetchedData = (
                    data
                        .graphql
                        .shortcode_media
                        .edge_sidecar_to_children
                        .edges
                );
                for (let i = 0; i < fetchedData.length; i++) {
                    pics.push(fetchedData[i].node.display_url);
                }
            } else {
                fetchedData = data.graphql.shortcode_media.display_url;
                pics.push(fetchedData);
            }

            for (let i = 0; i < pics.length; i++) {
                $("#fetchedImages").append(`<div class='image-container'><img src='${pics[i]}' alt='image${i}' id='${i}'/ ><span class='select'></span></div>`);
                $("#selectedImages").append("<span class='dot'></span>");
            }
            $("#fetchedImages").css("overflow-x", "auto"); // ? auto instread of scroll to hide scroll bar on desktop if not needed
            $("#illustration").hide();
            $("#instructions").hide();

            let selectedPics = [];
            $("#fetchedImages .image-container img").click(function () {
                let index = $("img").index($(this)); // ! starts at 1

                let picIndex = index - 1;
                if (selectedPics.includes(pics[picIndex])) {
                    $(`#fetchedImages .image-container:nth-of-type(${index}) .select`).css({
                        "transform": "scale(0)"
                    });
                    $(`#selectedImages .dot:nth-of-type(${index})`).removeClass("active");
                    let idx = selectedPics.indexOf(pics[picIndex]);
                    if (idx > -1) {
                        selectedPics.splice(idx, 1);
                    }
                } else {
                    $(`#fetchedImages .image-container:nth-of-type(${index}) .select`).css({
                        "transform": "scale(1)"
                    });
                    $(`#selectedImages .dot:nth-of-type(${index})`).addClass("active");
                    selectedPics.push(pics[picIndex]);
                }
            });

            $("#dl").click(function () {
                let zip = new JSZip();

                for (let i = 0; i < selectedPics.length; i++) {
                    zip.file("image" + i + ".jpg", selectedPics[i], { blob: true });
                }

                zip.generateAsync({ type: "blob" }).then(function (content) {
                    // see FileSaver.js
                    saveAs(content, "images.zip");
                });
            });
        },
        error: function (request, status, error) {
            alert("REQUEST:\t" + request + "\nSTATUS:\t" + status +
                "\nERROR:\t" + error);
        }
    });

    return pics;
}