const ThemeSelector = ({
    theme,
    onThemeChange
}) => {

    return (

        <select
            value={theme}
            onChange={(e)=>onThemeChange(e.target.value)}
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

            <option value="vs-dark">Dark</option>

            <option value="vs">Light</option>

        </select>

    );

};

export default ThemeSelector;