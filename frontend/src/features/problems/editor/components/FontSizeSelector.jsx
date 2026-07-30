const FontSizeSelector = ({
    fontSize,
    onFontSizeChange
}) => {

    return (

        <select
            value={fontSize}
            onChange={(e)=>onFontSizeChange(e.target.value)}
           className="
border border-gray-600
rounded-md
bg-gray-900
text-white
px-4
h-10
outline-none
focus:border-orange-500
transition-colors
"
        >

            <option value={12}>12</option>
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
            <option value={20}>20</option>

        </select>

    );

};

export default FontSizeSelector;