module.exports = (permissions, permissionsToChk) => {
    let granted = false;
    let missed = false;
    const chkKeys = Object.keys(permissionsToChk)

    if (Object.keys(permissions).length > 0 && chkKeys.length > 0) {
        chkKeys.forEach(per => {
            if (permissions[per] && !missed) {
                const actions = permissions[per];

                if (actions.includes('*'))
                    granted = true;
                else {
                    per.actionsTocheck.forEach(action => {
                        granted = granted || ((!actions.includes(action)) ? false : true);
                    });
                }
            }
            else {
                granted = false;
            }

            if (!granted)
                missed = true
        });

        return !missed;
    }
    else
        return false;
};
