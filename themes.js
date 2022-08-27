const themes = document.querySelector('.themes');

themes.onclick = (e) => {
    console.log(e.target.id);
    changeTheme(e.target.id)
}

function changeTheme(select) {
    let themes = {
        midday: {
            foreground: '#1b1b1b',
            background: '#e1edff',
            highlight: '#e00850'
        }, night: {
            foreground: '#e8e8e8',
            background: '#1b1b1b',
            highlight: '#fe688e'
        }, twilight: {
            foreground: '#1b1b1b',
            background: '#ffc6e2',
            highlight: '#e00850'
        },
    }
    let theme = themes[select];
    Object.keys(theme).forEach((key) => {
        document.querySelector(':root').style
            .setProperty(`--${key}`, theme[key]);
    })
}
