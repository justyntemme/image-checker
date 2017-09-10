function fillTable(imgs) {
    var dpi = 300;
    $.each(imgs, function(i, img) {

        var fd = new FormData();
        fd.append('file', img);

        $.ajax({
            url:  "process.php",
            data: fd,
            type: "POST",
            contentType: false,
            processData: false,
            cache: false,
            success: function(data) {
                $(data).appendTo("#table_datarows");
                $("#results").show();
            }
        });
    });
}

$(function() {

    $.ajaxSetup({
        headers : {
            'CsrfToken': $('meta[name="csrf-token"]').attr('content')
        }
    });

    if (window.File && window.FileList && window.FileReader) {
        $("#filedrag")
            .show()
            .on('dragover', function(e) {
                e.preventDefault();
                $(this).addClass("dragging");
            })
            .on('dragend dragleave', function(e) {
                e.preventDefault();
                $(this).removeClass("dragging");
            })
            .on('drop', function(e) {
                e.preventDefault();
                let files = e.originalEvent.dataTransfer.files;

                $(this).removeClass("dragging");
                fillTable(files);

            });
    }


    $(document).on('click', '#results .table-info', function(e) {
        $(this).toggleClass("expand");
    });

});