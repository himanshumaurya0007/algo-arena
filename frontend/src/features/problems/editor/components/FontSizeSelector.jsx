const FontSizeSelector = ({
    fontSize,
    onFontSizeChange
}) => {

    return (

        <select
            value={fontSize}
            onChange={(e)=>onFontSizeChange(e.target.value)}
            className="border rounded-md px-3 py-2 bg-gray-900 text-white"
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