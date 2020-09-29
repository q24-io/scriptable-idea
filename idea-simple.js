
let item = await loadItem()
let imgURL = null
let isDarkMode = Device.isUsingDarkAppearance()
let widget = await createWidget(item, imgURL, isDarkMode)

if (!config.runsInWidget) {
  await widget.presentMedium()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(item, gif, isDarkMode) {
  let author = item.author
  let w = new ListWidget()

  if (gif != null) {
    let imgReq = new Request(gif)
    let img = await imgReq.loadImage()
    w.backgroundImage = img
  }

  let tagText = w.addText(item.tag)
  tagText.font = Font.boldRoundedSystemFont(12)
  w.addSpacer()

  let titleTxt = w.addText(item.idea)
  titleTxt.font = Font.boldSystemFont(16)
  w.addSpacer(8)

  let authorTxt = w.addText(author)
  authorTxt.font = Font.mediumSystemFont(12)
  authorTxt.textOpacity = 0.9
  authorTxt.rightAlignText()
  w.addSpacer(2)

  let introTxt = w.addText(item.intro)
  introTxt.font = Font.mediumSystemFont(12)
  introTxt.textOpacity = 0.9
  introTxt.rightAlignText()
  w.addSpacer()

  if (isDarkMode) {
    w.backgroundColor = Color.black()
    titleTxt.textColor = Color.white()
    tagText.textColor = Color.green()
    authorTxt.textColor = Color.lightGray()
    introTxt.textColor = Color.lightGray()
  } else {
    w.backgroundColor = Color.white()
    titleTxt.textColor = Color.black()
    tagText.textColor = Color.green()
    authorTxt.textColor = Color.darkGray()
    introTxt.textColor = Color.darkGray()
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