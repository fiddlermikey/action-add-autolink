# action-add-autolink
Update repository autolink
```
name: Update Autolink References
on: [workflow_dispatch]


jobs:
  call-add-autolink:
    runs-on: ubuntu-latest
    steps:
      - name: Add autolink
        uses: fiddlermikey/action-add-autolink@v1.0
        with:
          token: ${{ secrets.V2BUILDTOKEN}}
          keyPrefix: 'ab#'
          url: 'https://dev.azure.com/Keyfactor/Integration/_workitems/edit/'
 
