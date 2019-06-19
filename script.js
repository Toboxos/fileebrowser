folderStatus = true;
fileStatus = 0; // 0 = VIEW     1 = DOWNLOAD    2 = DELETE
createFolder = false;
uploadStatus = false;

function toggleFolder() {
    folderStatus = !folderStatus;
    
    $('#folderStatus').toggleClass("folder-delete");
    $('#folderStatus').toggleClass("folder-view");
    $('.folder').toggleClass("folder-delete");
    $('.folder').toggleClass("folder-view");
    $('input[name=\'action\']').attr("value", !folderStatus ? 2 : 0);
}

function fileDownload() {
    if( fileStatus == 1 ) {
        $('#fileDownload').removeClass('file-view');
        $('#fileDownload').addClass('file-download');
        
        $('.file').removeClass('file-download file-delete');
        $('.file').addClass('file-view');
        
        fileStatus = 0;
        $('input[name=\'action\']').attr("value", 0);
    } else {
        $('#fileDownload').removeClass('file-download');
        $('#fileDownload').addClass('file-view');
        
        $('.file').removeClass('file-view file-delete');
        $('.file').addClass('file-download');
        
        fileStatus = 1;
        $('input[name=\'action\']').attr("value", 1);
    }
    
    $('#fileDelete').removeClass('file-view');
    $('#fileDelete').addClass('file-delete');
}

function fileDelete() {
    if( fileStatus == 2 ) {
        $('#fileDelete').removeClass('file-view');
        $('#fileDelete').addClass('file-delete');
        
        $('.file').removeClass('file-download file-delete');
        $('.file').addClass('file-view');
        
        fileStatus = 0;
        $('input[name=\'action\']').attr("value", 0);
    } else {
        $('#fileDelete').removeClass('file-delete');
        $('#fileDelete').addClass('file-view');
        
        $('.file').removeClass('file-view file-download');
        $('.file').addClass('file-delete');
        
        fileStatus = 2;
        $('input[name=\'action\']').attr("value", 2);
    }
    
    $('#fileDownload').removeClass('file-view');
    $('#fileDownload').addClass('file-download');
}

function toggleCreate() {
    createFolder = !createFolder;
    
    $('#file-upload').slideUp();
    uploadStatus = false;

    if( createFolder ) {
        $('#folder-name').slideDown();
    } else {
        $('#folder-name').slideUp();
    }
}

function toggleUpload() {
    uploadStatus = !uploadStatus;
    
    $('#folder-name').slideUp();
    createFolder = false;

    if( uploadStatus ) {
        $('#file-upload').slideDown();
    } else {
        $('#file-upload').slideUp();
    }
}