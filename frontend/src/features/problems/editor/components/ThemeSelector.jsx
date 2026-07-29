const ThemeSelector = ({
    theme,
    onThemeChange
}) => {

    return (

        <select
            value={theme}
            onChange={(e)=>onThemeChange(e.target.value)}
            className="border rounded-md px-3 py-2 bg-gray-900 text-white"
        >

            <option value="vs-dark">Dark</option>

            <option value="vs">Light</option>

        </select>

    );

};

export default ThemeSelector;