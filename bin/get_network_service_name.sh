#!/bin/sh
# ----
scutil_query()
{
    key=$1

    scutil<<EOT
    open
    get $key
    d.show
    close
EOT
}

echo `scutil_query State:/Network/Global/IPv4`
SERVICE_GUID=`scutil_query State:/Network/Global/IPv4 | grep "PrimaryService" | awk '{print $3}'`

echo `scutil_query Setup:/Network/Service/$SERVICE_GUID`
SERVICE_NAME=`scutil_query Setup:/Network/Service/$SERVICE_GUID | grep "UserDefinedName" | awk -F': ' '{print $2}'`

echo $SERVICE_NAME

exit 0;
# ----
SERVICE_GUID=`
    echo -e "open\nget State:/Network/Global/IPv4\nd.show" |
    scutil |
    awk '/PrimaryService/{print $3}'
`

SERVICE_NAME=`
    echo -e "open\nget Setup:/Network/Service/$SERVICE_GUID\nd.show" |
    scutil |
    awk -F': ' '/UserDefinedName/{print $2}'
`

echo $SERVICE_NAME