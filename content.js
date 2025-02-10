document.addEventListener('keydown', (e) => {
    const editor = document.querySelector('#prompt-textarea');
    if (!editor || !editor.contains(e.target)) {
        return;
    }

    if (e.key === '>') {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const currentP = range.startContainer.parentElement;

        const text = currentP.textContent;
        const cursorPosition = range.startOffset;

        const lastOpenBracket = text.lastIndexOf('<', cursorPosition - 1);
        if (lastOpenBracket === -1) return;

        const tagContent = text.substring(lastOpenBracket + 1, cursorPosition).trim();
        if (!tagContent || tagContent.includes('<') || tagContent.includes('>')) return;

        setTimeout(() => {
            const newLineP = document.createElement('p');
            newLineP.textContent = '';
            currentP.after(newLineP);

            const closingTagP = document.createElement('p');
            closingTagP.textContent = `</${tagContent}>`;
            newLineP.after(closingTagP);

            const newRange = document.createRange();
            newRange.setStart(newLineP, 0);
            newRange.collapse(true);

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(newRange);
        }, 0);
    }
});