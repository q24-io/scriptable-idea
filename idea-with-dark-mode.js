let item = await loadItem()
let widget = await createWidget(item)

if (!config.runsInWidget) {
  await widget.presentLarge()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(item) {
  let w = new ListWidget()
  let tagText = w.addText(item.tag)
  tagText.font = Font.boldRoundedSystemFont(12)
  w.addSpacer(4)

  let titleTxt = w.addText(item.idea)
  titleTxt.font = Font.boldSystemFont(14)
  w.addSpacer(8)

  let authorTxt = w.addText(item.author)
  authorTxt.font = Font.mediumSystemFont(12)
  authorTxt.textOpacity = 0.9
  authorTxt.rightAlignText()
  w.addSpacer(2)

  let introTxt = w.addText(item.intro)
  introTxt.font = Font.mediumSystemFont(12)
  introTxt.textOpacity = 0.9
  introTxt.rightAlignText()
  w.addSpacer(8)

  let curatorText = w.addText("由 " + item.curator + " 提供")
  curatorText.font = Font.mediumSystemFont(10)
  curatorText.textOpacity = 0.5
  curatorText.rightAlignText()

  if (Device.isUsingDarkAppearance()) {
    w.backgroundColor = Color.black()
    titleTxt.textColor = Color.white()
    tagText.textColor = Color.green()
    authorTxt.textColor = Color.lightGray()
    introTxt.textColor = Color.lightGray()
    curatorText.textColor = Color.lightGray()
  } else {
    w.backgroundColor = Color.white()
    titleTxt.textColor = Color.black()
    tagText.textColor = Color.green()
    authorTxt.textColor = Color.darkGray()
    introTxt.textColor = Color.darkGray()
    curatorText.textColor = Color.darkGray()
  }
  w.url = item.url
  return w
}

async function loadItem() {
  let url = "https://q24.io/api/v1/idea"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}