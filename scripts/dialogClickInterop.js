// Automatically close Radzen dialogs when clicking outside the dialog content
document.addEventListener('click', function(e) {
    // Skip if any popup or overlay panel is open
    var popups = document.querySelectorAll('.rz-popup, .rz-overlaypanel');
    for (var i = 0; i < popups.length; i++) {
        if (popups[i].style.display !== 'none') {
            return;
        }
    }
    var dialogs = document.querySelectorAll('.rz-dialog-content');
    if (dialogs.length === 0) {
        return;
    }
    var lastDialog = dialogs[dialogs.length - 1];
    if (lastDialog.parentElement && !lastDialog.parentElement.contains(e.target)) {
        if (window.Radzen && window.Radzen.dialogService) {
            window.Radzen.dialogService.invokeMethodAsync('Close', null);
        }
    }
});
