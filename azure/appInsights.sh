#!/bin/bash
# This script take as inputs 3 aeguments:
# $1 - environment name 
# $2 - component library service resource group name

# Only make a new app insights instance if we actually need one
az extension add --name application-insights

echo "Getting app insights..."
insights=`az monitor app-insights component show --app componentlibrary-$1-appinsights -g $2`

if [ $? -eq 3 ]; then
    echo "Adding app insights component..."
    insights=`az monitor app-insights component create --app componentlibrary-$1-appinsights --location westus2 --kind web -g $2 --application-type web`
fi
insightsID=`echo $insights | jq -r '.id' -`

echo "App Insights ID $insightsID. Creating action group..."

# Create action group and metric alert rules
channel=`cat alerts.json | jq -r .webhooks[0].url -`
group=`az monitor action-group show --name componentlibrary-$1-actiongroup --resource-group $2`
if [ $? -eq 3 ]; then
    echo "Creating group and alerts..."
    group=`az monitor action-group create --name componentlibrary-$1-actiongroup --resource-group $2 --action webhook p2pteams $channel`
    groupID=`echo $group | jq -r '.id' -`
    az monitor metrics alert create --name "Duration Abnormal" --resource-group $2 --condition "avg requests/duration > 800" --description "Average duration exceeds 800ms" --scopes $insightsID --action $groupID
    az monitor metrics alert create --name "Exceptions Abnormal" --resource-group $2 --condition "count exceptions/count > 1" --description "Exceptions abnormal" --scopes $insightsID --action $groupID
    az monitor metrics alert create --name "Failed Requests" --resource-group $2 --condition "count requests/failed > 1" --description "Failed Requests Abonrmal" --scopes $insightsID --action $groupID
fi
