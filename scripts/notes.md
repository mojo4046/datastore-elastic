## Scenarios

# A new notification comes in

1. Percolate the notification document against `notification_views` identifying the matching queries
2. Save the output to `notifications__saved_notification_views` matching a notification with a saved view/query

# A new notfication view is created

1. Do a traditional es search against the `notifications` index
2. Seed the results in `notifications__saved_notification_views`

# A notfication view is updated

1. Do a traditional es search against the `notifications` index
2. Seed the results in `notifications__saved_notification_views`
