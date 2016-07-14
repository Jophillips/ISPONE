
 /*Game JavaScript Code */

    var reserves = numbro("1k").format('0.00a');
    var revenue = numbro("10m").format('0.00a');
    var expenses = numbro("5k").format('0.00a');


    var multiplier;

    var currentTime;
    var timeDifference;

    var gameData = JSON.parse(localStorage.getItem("savedData"));

    console.log(gameData); //prints gameData to Log for testing, can be removed now if you're removing clutter.

    var apologysCost, throttleCost, softDataCapCost, hardDataCapCost, phoneBundlesCost, tvBundlesCost, prioritizeCost, monopolizeCost, lobbyistCost;

    var complaintsWhileAway = 0;

    var redeemAmount = 1;
    var hellrequirement = 100000000000000; //100 trillion

//http://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
    var clockSpeed = 1;

    var clockIteration = 10;

    var clockmultiplier = 1;



    var saveFrequency = 5000; //ms

    var refreshFrequency = 50; //ms

    var achieve1;

    var left = "left";
    var right = "right";

/* Starting Costs for each upgrade -minus One*/
    var apologyInitial = 9;
    var throttleInitial = 199;
    var softDataCapInitial = 499;
    var hardDataCapInitial = 119999;
    var phoneBundlesInitial = 499999;
    var tvBundlesInitial = 6999999;
    var prioritizeInitial = 49999999;
    var monopolizeInitial = 139999999;

    var lobbyistInitialCost = 10000;

    var apologysCpSRate = 1;
    var throttleCpSRate = 2;
    var softDataCapCpSRate = 5;
    var hardDataCapCpSRate = 50;
    var phoneBundlesCpSRate = 125;
    var tvBundlesCpSRate = 1250;
    var prioritizeCpSRate = 5000;
    var monopolizeCpSRate = 100000;

    var displaySetting = "Medium"; 
    var audioSetting = "Off"; 
    var clockSetting = "Medium";
    var saveSetting = "ON"

    function displaySettings(direction){

        if (direction === "left"){

            if (displaySetting === "Medium") {
                displaySetting = "Low";
                document.getElementById('graph').innerHTML = displaySetting;                
            }
            if (displaySetting === "High") {
                displaySetting = "Medium";
                document.getElementById('graph').innerHTML = displaySetting;     
            }

        }

        if (direction === "right"){

            if (displaySetting === "Medium") {
                displaySetting = "High";
                document.getElementById('graph').innerHTML = displaySetting;     
            }
            if (displaySetting === "Low") {
                displaySetting = "Medium";
                document.getElementById('graph').innerHTML = displaySetting;     
            }
            

        }

    }

    function audioSettings(direction){


        if (direction === "left"){

            if (audioSetting === "ON") {
                audioSetting = "Off";
                document.getElementById('audio').innerHTML = audioSetting;                
            }

        }

        if (direction === "right"){

            if (audioSetting === "Off") {
                audioSetting = "ON";
                document.getElementById('audio').innerHTML = audioSetting;                
            }
            

        }

    }

    function clockSettings(direction){

        if (direction === "left"){

            if (clockSetting === "Medium") {
                clockSetting = "Low";
                document.getElementById('clock').innerHTML = clockSetting;                
            }
            if (clockSetting === "High") {
                clockSetting = "Medium";
                document.getElementById('clock').innerHTML = clockSetting;     
            }

        }

        if (direction === "right"){

            if (clockSetting === "Medium") {
                clockSetting = "High";
                document.getElementById('clock').innerHTML = clockSetting;     
            }
            if (clockSetting === "Low") {
                clockSetting = "Medium";
                document.getElementById('clock').innerHTML = clockSetting;     
            }
            

        }

    }

    function saveSettings(direction){


        if (direction === "left"){

            if (saveSetting === "ON") {
                saveSetting = "Off";
                document.getElementById('save').innerHTML = saveSetting;                
            }

        }

        if (direction === "right"){

            if (saveSetting === "Off") {
                saveSetting = "ON";
                document.getElementById('save').innerHTML = saveSetting;                
            }
            

        }

    }

    function unformatNumbers(){
        reserves = numbro().unformat(reserves);
        revenue = numbro().unformat(revenue);
        expenses = numbro().unformat(expenses);
        complaints = numbro().unformat(complaints);
        apologysCost = numbro().unformat(apologysCost);
        throttleCost = numbro().unformat(throttleCost);
        softDataCapCost = numbro().unformat(softDataCapCost);
        hardDataCapCost = numbro().unformat(hardDataCapCost);
        phoneBundlesCost = numbro().unformat(phoneBundlesCost);
        tvBundlesCost = numbro().unformat(tvBundlesCost);
        prioritizeCost = numbro().unformat(prioritizeCost);
        monopolizeCost = numbro().unformat(monopolizeCost);
    }

    function formatNumbers(){
        reserves = numbro(reserves).format('0.000a');
        revenue = numbro(revenue).format('0.000a');
        expenses = numbro(expenses).format('0.000a');

        if(complaints > 1000){
            complaints = numbro(complaints).format('0.000a');
        }

        if(apologysCost > 1000){
            apologysCost = numbro(apologysCost).format('0.000a');
        }

        if(throttleCost > 1000){
            throttleCost = numbro(throttleCost).format('0.000a');
        }

        if(softDataCapCost > 1000){
            softDataCapCost = numbro(softDataCapCost).format('0.000a');
        }

        if(hardDataCapCost > 1000){
            hardDataCapCost = numbro(hardDataCapCost).format('0.000a');
        }

        if(phoneBundlesCost > 1000){
            phoneBundlesCost = numbro(phoneBundlesCost).format('0.000a');
        }

        if(tvBundlesCost > 1000){
            tvBundlesCost = numbro(tvBundlesCost).format('0.000a');
        }

        if(prioritizeCost > 1000){
            prioritizeCost = numbro(prioritizeCost).format('0.000a');
        }

        if(monopolizeCost > 1000){
            monopolizeCost = numbro(monopolizeCost).format('0.000a');
        }


    }

    function oneSecondBar() {
        var elementApology = document.getElementById("apologyBar");
        var elementThrottle = document.getElementById("throttleBar");
        var elementSoftDataCap = document.getElementById("softDataCapBar");
        var elementHardDataCap = document.getElementById("hardDataCapBar");
        var elementPhoneBundle = document.getElementById("phoneBundleBar");
        var elementTvBundle = document.getElementById("tvBundleBar");
        var elementPrioritize = document.getElementById("prioritizeBar");
        var elementMonopolize = document.getElementById("monopolizeBar");



        var height = 100; 
        var id = setInterval(frame, clockIteration);

        function frame() {
            if (height <= 0) {
                clearInterval(id);
            } else {
                height = height - clockmultiplier;

                if(apologys > 0){elementApology.style.height = height + '%';
                }
                if(throttle > 0){elementThrottle.style.height = height + '%';
                }
                if(softDataCap > 0){elementSoftDataCap.style.height = height + '%';
                }
                if(hardDataCap > 0){elementHardDataCap.style.height = height + '%';
                }
                if(phoneBundles > 0){elementPhoneBundle.style.height = height + '%';
                }
                if(tvBundles > 0){elementTvBundle.style.height = height + '%';
                }
                if(prioritize > 0){elementPrioritize.style.height = height + '%';
                }
                if(monopolize > 0){elementMonopolize.style.height = height + '%';
                }


            }
        }
    }

    function achievement(){

            setTimeout(function(){
            //popout
            document.getElementById("achievement").className = "achievementOut";
            document.getElementById("achievementBehind").className = "achievementOutBehind";

                setTimeout(function(){

                    document.getElementById("achievement").className = "achievement";
                    document.getElementById("achievementBehind").className = "achievement";
                }, 3500);

            }, 200);

    }

    function changeRedeemAmount(){

      var redeemAmountCheck = document.getElementById('redeemAmount').innerHTML;

        if (redeemAmountCheck == 1) {
            document.getElementById('redeemAmount').innerHTML = 10;
            redeemAmount = 10;
         }

        if (redeemAmountCheck == 10) {
            document.getElementById('redeemAmount').innerHTML = 100;
            redeemAmount = 100;
         }

        if (redeemAmountCheck == 100) {
            document.getElementById('redeemAmount').innerHTML = 1;
            redeemAmount = 1;
         }
    }

    function updateCosts(){

       var newApologysCost = 0;
       var newThrottleCost = 0;
       var newSoftDataCapCost = 0;
       var newHardDataCapCost = 0;
       var newPhoneBundlesCost = 0;
       var newTvBundlesCost = 0;
       var newPrioritizeCost = 0;
       var newMonopolizeCost = 0;


        for (i = 0; i < redeemAmount; i++) {

            apologysCost = Math.round(Math.pow(multiplier, (apologys + i)) +apologyInitial);
            throttleCost = Math.round(Math.pow(multiplier, (throttle + i)) +throttleInitial);
            softDataCapCost = Math.round(Math.pow(multiplier, (softDataCap + i)) + softDataCapInitial);
            hardDataCapCost = Math.round(Math.pow(multiplier, (hardDataCap + i)) + hardDataCapInitial);
            phoneBundlesCost = Math.round(Math.pow(multiplier, (phoneBundles + i)) + phoneBundlesInitial);
            tvBundlesCost = Math.round(Math.pow(multiplier, (tvBundles + i)) + tvBundlesInitial);
            prioritizeCost = Math.round(Math.pow(multiplier, (prioritize + i)) + prioritizeInitial);
            monopolizeCost = Math.round(Math.pow(multiplier, (monopolize + i)) + monopolizeInitial);


            newApologysCost = newApologysCost + apologysCost;            
            newThrottleCost = newThrottleCost + throttleCost;
            newSoftDataCapCost = newSoftDataCapCost + softDataCapCost;
            newHardDataCapCost = newHardDataCapCost + hardDataCapCost;
            newPhoneBundlesCost = newPhoneBundlesCost + phoneBundlesCost;
            newTvBundlesCost = newTvBundlesCost + tvBundlesCost;
            newPrioritizeCost = newPrioritizeCost + prioritizeCost;
            newMonopolizeCost = newMonopolizeCost + monopolizeCost;


        }

            if (newApologysCost > hellrequirement) {
                apologysCost = "Too Much";
            }
            else {
                apologysCost = newApologysCost;
            }

            if (newThrottleCost > hellrequirement) {
                throttleCost = "Too Much";
            }
            else {
                throttleCost = newThrottleCost;
            }

            if (newSoftDataCapCost > hellrequirement) {
                softDataCapCost = "Too Much";
            }
            else {
                softDataCapCost = newSoftDataCapCost;
            }

            if (newHardDataCapCost > hellrequirement) {
                hardDataCapCost = "Too Much";
            }
            else {
                hardDataCapCost = newHardDataCapCost;
            }

            if (newPhoneBundlesCost > hellrequirement) {
                phoneBundlesCost = "Too Much";
            }
            else {
                phoneBundlesCost = newPhoneBundlesCost;
            }

            if (newTvBundlesCost > hellrequirement) {
                tvBundlesCost = "Too Much";
            }
            else {
                tvBundlesCost = newTvBundlesCost;
            }

            if (newPrioritizeCost > hellrequirement) {
                prioritizeCost = "Too Much";
            }
            else {
                prioritizeCost = newPrioritizeCost;
            }

            if (newMonopolizeCost > hellrequirement) {
                monopolizeCost = "Too Much";
            }
            else {
                monopolizeCost = newMonopolizeCost;
            }

    }

    function updateScreen() {
        unformatNumbers();

        document.getElementById('apologys').innerHTML = apologys;
        document.getElementById('throttle').innerHTML = throttle;
        document.getElementById('softDataCap').innerHTML = softDataCap;
        document.getElementById('hardDataCap').innerHTML = hardDataCap;
        document.getElementById('phoneBundles').innerHTML = phoneBundles;
        document.getElementById('tvBundles').innerHTML = tvBundles;
        document.getElementById('prioritize').innerHTML = prioritize;
        document.getElementById('monopolize').innerHTML = monopolize;

        updateCosts();

        lobbyistCost = lobbyistInitialCost;

        formatNumbers();

        document.getElementById('complaints').innerHTML = complaints;

        document.getElementById('apologysCost').innerHTML = apologysCost;
        document.getElementById('throttleCost').innerHTML = throttleCost;
        document.getElementById('softDataCapCost').innerHTML = softDataCapCost;
        document.getElementById('hardDataCapCost').innerHTML = hardDataCapCost;
        document.getElementById('phoneBundlesCost').innerHTML = phoneBundlesCost;
        document.getElementById('tvBundlesCost').innerHTML = tvBundlesCost;
        document.getElementById('prioritizeCost').innerHTML = prioritizeCost;
        document.getElementById('monopolizeCost').innerHTML = monopolizeCost;

        document.getElementById('lobbyists').innerHTML = lobbyists;

        document.getElementById('lobbyistCost').innerHTML = lobbyistCost;

    }

    function deleteGame() {

        if (confirm('Are you sure you want to delete your saved game??')) {
                localStorage.removeItem("save");
                window.localStorage.clear();
                location.reload();
            } else {
        // Do nothing!
        }

    }

    function loadGame() {

        if (firstGame !== 0) {
            document.getElementById('light').style.display = 'block';
            document.getElementById('fade').style.display = 'block';

            apologys = 1;
            throttle = 0;
            softDataCap = 0;
            hardDataCap = 0;
            phoneBundles = 0;
            tvBundles = 0;
            prioritize = 0;
            monopolize = 0;
            complaints = 0;
            firstGame = 0;
            achieve1 = 0;
            lobbyists = 0;
            multiplier = 3;


        } else {


            clockSpeed = 1000 / clockmultiplier;


            console.log(firstGame);
            updateMultiplier();

            currentTime = Date.now();

            var timeDifferenceMinutes = 0;
            var timeDifferenceHours = 0;
            var timeDelay = 60000; // 1 minutes in milliseconds

            timeDifference = (currentTime - savedTime) / 1000;

            if ((savedTime + timeDelay) < currentTime){

                if (timeDifference > 60 && timeDifference < 3600){

                    timeDifferenceMinutes = parseInt(timeDifference / 60);
                    timeAwayClicks();

                    document.getElementById('achievementText').innerHTML = "Hello There<br/> <i style='font-size:80%'>Looks like you've been away for " + timeDifferenceMinutes +  " minutes. You earned " + complaintsWhileAway + " complaints during this time. </i>";
                
                    console.log("Over a Minute");

                }

                if (timeDifference > 3600){

                    timeDifferenceHours = parseInt(timeDifference / 3600);
                    timeDifferenceMinutes = parseInt((timeDifference - (timeDifferenceHours * 3600)) / 60);

                    timeAwayClicks();
                    if (timeDifferenceHours = 1 ){
                            document.getElementById('achievementText').innerHTML = "Hello There<br/> <i style='font-size:80%'>Looks like you've been away for " + timeDifferenceHours + " hour and " + timeDifferenceMinutes + " minutes. You earned " + complaintsWhileAway + " complaints during this time.  </i>";
                  

                    }
                    else {
                          document.getElementById('achievementText').innerHTML = "Hello There<br/> <i style='font-size:80%'>Looks like you've been away for " + timeDifferenceHours + " hours and " + timeDifferenceMinutes + " minutes. You earned " + complaintsWhileAway + " complaints during this time.  </i>";
                    }
                   
                         
                    console.log("Over an Hour");

                }


                    achievement();

            }

        }

    }

    function timeAwayClicks(){

        complaintClick((apologys * apologysCpSRate) * timeDifference);
        complaintClick((throttle * throttleCpSRate) * timeDifference);
        complaintClick((softDataCap * softDataCapCpSRate) * timeDifference);
        complaintClick((hardDataCap * hardDataCapCpSRate) * timeDifference);
        complaintClick((phoneBundles * phoneBundlesCpSRate) * timeDifference);
        complaintClick((tvBundles * tvBundlesCpSRate) * timeDifference);
        complaintClick((prioritize * prioritizeCpSRate) * timeDifference);
        complaintClick((monopolize * monopolizeCpSRate) * timeDifference);

        complaintsWhileAway = parseInt(((apologys * apologysCpSRate) * timeDifference) + ((throttle * throttleCpSRate) * timeDifference) + ((softDataCap * softDataCapCpSRate) * timeDifference) + ((hardDataCap * hardDataCapCpSRate) * timeDifference) + ((phoneBundles * phoneBundlesCpSRate) * timeDifference)  + ((tvBundles * tvBundlesCpSRate) * timeDifference) + ((prioritize * prioritizeCpSRate) * timeDifference) + ((monopolize * monopolizeCpSRate) * timeDifference));
        

        if (complaintsWhileAway > 1000) {

            complaintsWhileAway = numbro(complaintsWhileAway).format('0.000a');

        }



        console.log("TimeAwayClicks" + complaintsWhileAway);

    }

    function updateMultiplier(){
            multiplier = 1 + ((200 / (lobbyists + 1 ))/ 100);

            var multiplierDisplay = ( (multiplier - 1) * 100 );

            document.getElementById('multiplier').innerHTML = (multiplierDisplay).toFixed(2);

    }

    function saveGame() {
        firstGame = 0;
        unformatNumbers();

        savedTime = Date.now();

        var savedData = {
            complaints: complaints,
            apologys: apologys,
            throttle: throttle,
            softDataCap: softDataCap,
            hardDataCap: hardDataCap,
            phoneBundles: phoneBundles,
            tvBundles: tvBundles,
            prioritize: prioritize,
            monopolize: monopolize,
            lobbyists: lobbyists,
            firstGame: firstGame,
            savedTime: savedTime,
        };

        localStorage.setItem("savedData", JSON.stringify(savedData));
        formatNumbers();

        console.log(`The time is now ${Date.now()} UTC.`);
    }

    function developerOn() {
        unformatNumbers();
        complaints = complaints + 100000000000;
        document.getElementById("complaints").innerHTML = complaints;
        formatNumbers();
    }

//Used in the corporate Tab
    function updateReserves() {

        unformatNumbers();

        var newRevenueChange = revenue - expenses;
        reserves = reserves + newRevenueChange;

        formatNumbers();

        document.getElementById('reserves').innerHTML = reserves;
        document.getElementById('revenue').innerHTML = numbro(revenue).format('0.00a');
        document.getElementById('expenses').innerHTML = numbro(expenses).format('0.00a');

    }

    function achievementCheck(){

        if (apologys > 9 && achieve1 === 0) {
                document.getElementById('achievementText').innerHTML = "Achievement Unlocked!<br/> <i style='font-size:80%'>Script Kiddie: Buy 10 Script Apologies.</i>";
                achievement();
                achieve1 = 1;
            }
    }

    function complaintClick(number) {
        unformatNumbers();
        complaints = complaints + number;
        formatNumbers();

        document.getElementById("complaints").innerHTML = complaints;

        if (complaints === null) {
            complaints = 0;
        }

    }

    function hireLobbyist(){

        unformatNumbers();

            if (complaints >= lobbyistCost) {

                var randomChance = Math.floor((Math.random() * 4) + 1);

                lobbyists = lobbyists + 1; 
                complaints = complaints - lobbyistCost;

                if (randomChance == 4){

                    apologys = 1;
                    throttle = 0;
                    softDataCap = 0;
                    hardDataCap = 0;
                    phoneBundles = 0;
                    tvBundles = 0;
                    prioritize = 0;
                    monopolize = 0;
                    complaints = 0;

                    console.log("The number was " + randomChance); 
                    document.getElementById('achievementText').innerHTML = "Oh No!<br/> <i style='font-size:80%'>You've been sent back in time! Careful hiring lobbyists.</i>";
                    achievement();

                }

            }


        formatNumbers();

        document.getElementById('lobbyistCost').innerHTML = lobbyistCost;
        document.getElementById('lobbyists').innerHTML = lobbyists;

        updateMultiplier();

        saveGame();
    }

//////////////////////////////////////////
// Buy Functions
//////////////////////////////////////////

    function buyapology() {
        unformatNumbers();

            if (complaints >= apologysCost) {
                apologys = apologys + redeemAmount;
                complaints = complaints - apologysCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buythrottle() {
        unformatNumbers();

            if (complaints >= throttleCost) {
                throttle = throttle + redeemAmount;
            complaints = complaints - throttleCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buySoftDataCap() {
        unformatNumbers();

            if (complaints >= softDataCapCost) {
                softDataCap = softDataCap + redeemAmount;
                complaints = complaints - softDataCapCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buyHardDataCap() {
        unformatNumbers();

            if (complaints >= hardDataCapCost) {
                hardDataCap = hardDataCap + redeemAmount;
                complaints = complaints - hardDataCapCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buyPhoneBundles() {
        unformatNumbers();

            if (complaints >= phoneBundlesCost) {
                phoneBundles = phoneBundles + redeemAmount;
                complaints = complaints - phoneBundlesCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buyTvBundles() {
        unformatNumbers();

            if (complaints >= tvBundlesCost) {
                tvBundles = tvBundles + redeemAmount;
                complaints = complaints - tvBundlesCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buyPrioritize() {
        unformatNumbers();

            if (complaints >= prioritizeCost) {
                prioritize = prioritize + redeemAmount;
                complaints = complaints - prioritizeCost;
            }

        formatNumbers();
        achievementCheck();
    }

    function buyMonopolize() {
        unformatNumbers();

        if (complaints >= monopolizeCost) {
            monopolize = monopolize + redeemAmount;
            complaints = complaints - monopolizeCost;
        }

        formatNumbers();
        achievementCheck();
    }

    function clickTurbo(){

        complaintClick(apologys * apologysCpSRate);
        complaintClick(throttle * throttleCpSRate);
        complaintClick(softDataCap * softDataCapCpSRate);
        complaintClick(hardDataCap * hardDataCapCpSRate);
        complaintClick(phoneBundles * phoneBundlesCpSRate);
        complaintClick(tvBundles * tvBundlesCpSRate);
        complaintClick(prioritize * prioritizeCpSRate);
        complaintClick(monopolize * monopolizeCpSRate);

    }

    function updateButtons() {

        unformatNumbers();

        if (apologysCost > complaints || apologysCost === undefined) {
                document.getElementById("apol").setAttribute("class", "btn") }
            else {
                document.getElementById("apol").setAttribute("class", "greenBtn")
        }

        if (throttleCost > complaints || throttleCost === undefined) {
                document.getElementById("throt").setAttribute("class", "btn") }
            else {
                document.getElementById("throt").setAttribute("class", "greenBtn")
        }

        if (softDataCapCost > complaints || softDataCapCost === undefined) {
                document.getElementById("sdp").setAttribute("class", "btn") }
            else {
                document.getElementById("sdp").setAttribute("class", "greenBtn")
        }

        if (hardDataCapCost > complaints || hardDataCapCost === undefined) {
                document.getElementById("hdp").setAttribute("class", "btn") }
            else {
                document.getElementById("hdp").setAttribute("class", "greenBtn")
        }

        if (phoneBundlesCost > complaints || phoneBundlesCost === undefined) {
                document.getElementById("phonebun").setAttribute("class", "btn") }
            else {
                document.getElementById("phonebun").setAttribute("class", "greenBtn")
        }

        if (tvBundlesCost > complaints || tvBundlesCost === undefined) {
                document.getElementById("tvbun").setAttribute("class", "btn") }
            else {
                document.getElementById("tvbun").setAttribute("class", "greenBtn")
        }

        if (prioritizeCost > complaints || prioritizeCost === undefined) {
                document.getElementById("prior").setAttribute("class", "btn") }
            else {
                document.getElementById("prior").setAttribute("class", "greenBtn")
        }

        if (monopolizeCost > complaints || monopolizeCost === undefined) {
                document.getElementById("monopol").setAttribute("class", "btn") }
            else {
                document.getElementById("monopol").setAttribute("class", "greenBtn")
        }

        if (lobbyistCost > complaints || lobbyistCost === undefined) {
                document.getElementById("hireLob").setAttribute("class", "btnTwo") }
            else {
                document.getElementById("hireLob").setAttribute("class", "bigGreenBtn")
        }

        formatNumbers();

    }

//  Check if this is the first time loading the game if so parse gameData from local storage

    if (gameData === null) {

            console.log('This is the first time loading the game.');

        } else {

            console.log('This is NOT the first time loading the game.');

            var complaints = parseInt(gameData.complaints);
            var apologys = parseInt(gameData.apologys);
            var throttle = parseInt(gameData.throttle);
            var softDataCap = parseInt(gameData.softDataCap);
            var hardDataCap = parseInt(gameData.hardDataCap);
            var phoneBundles = parseInt(gameData.phoneBundles);
            var tvBundles = parseInt(gameData.tvBundles);
            var prioritize = parseInt(gameData.prioritize);
            var monopolize = parseInt(gameData.monopolize);
            var firstGame = parseInt(gameData.firstGame);
            var achieve1 = parseInt(gameData.achieve1);
            var lobbyists = parseInt(gameData.lobbyists);
            var savedTime = parseInt(gameData.savedTime);

            console.log("# Of Complaints at load:" + complaints);

     }

////////////////////
//  Game Clocks
////////////////////

    window.setInterval(function() {

        updateReserves();
        saveGame();

    }, saveFrequency);

    window.setInterval(function() {

        complaintClick(apologys * apologysCpSRate);
        complaintClick(throttle * throttleCpSRate);
        complaintClick(softDataCap * softDataCapCpSRate);
        complaintClick(hardDataCap * hardDataCapCpSRate);
        complaintClick(phoneBundles * phoneBundlesCpSRate);
        complaintClick(tvBundles * tvBundlesCpSRate);
        complaintClick(prioritize * prioritizeCpSRate);
        complaintClick(monopolize * monopolizeCpSRate);

        console.log("Clock Speed is " + clockSpeed);

        oneSecondBar();

    }, clockSpeed);

    window.setInterval(function() {

        updateButtons();
        updateScreen();

    }, refreshFrequency);