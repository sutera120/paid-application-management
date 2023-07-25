const originalModules = {
    /*文字列を先頭から伏字にする関数
    第1引数:Str 変換したい文字
    第2引数:Int 伏字にする文字数
    */
    toMasked:
        (str, int = 1) => {
            const convStr = str.toString();
            // const int = Number(int);
            const maskedLength = (int >= convStr.length) ? 1 : convStr.length - int;
            const sliceStr = str.slice(- int);
            const maskStr = "*".repeat(maskedLength);
            const maskedStr = maskStr + sliceStr;
            return maskedStr;
        },
}

module.exports = originalModules;