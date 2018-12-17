module.exports = {
    getItems: function(routes) {
        return Object.values(routes)
            // filter out routes that are explicitly marked
            // to not appear in the menu
            .filter((route) => {
                return !('in_menu' in route) || route.in_menu
            })
            // first sort the items alphabetically as a default order
            .sort((a, b) => {

                let itemA = (a.label || a.title).toLowerCase()
                let itemB = (b.label || b.title).toLowerCase()


                if(itemA < itemB) return -1;
                if(itemA > itemB) return 1;
                else return 0;
            })
            // then sort the items by position (if suplied)
            .sort((a, b) => {
                if(a.position < b.position) return -1;
                if(a.position > b.position) return 1;
                else return 0;
            });
    }
}
