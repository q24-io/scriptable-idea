let item = await loadItem()
let imgURL = "https://picsum.photos/360/200"
let widget = await createWidget(item, imgURL)
if (!config.runsInWidget) {
  await widget.presentMedium()
}
Script.setWidget(widget)
Script.complete()

async function createWidget(item, gif) {
  let author = item.author
  let w = new ListWidget()

  if (gif != null) {
    let imgReq = new Request(gif)
    let img = await imgReq.loadImage()
    w.backgroundImage = img
  }

  w.backgroundColor = new Color("#3ecf8e")
  w.addSpacer()
  let titleTxt = w.addText(item.idea)
  titleTxt.font = Font.boldSystemFont(16)
  titleTxt.textColor = Color.white()
  w.addSpacer(8)
  let authorTxt = w.addText(author)
  authorTxt.font = Font.mediumSystemFont(12)
  authorTxt.textColor = Color.white()
  authorTxt.textOpacity = 0.9
  authorTxt.rightAlignText()
  w.addSpacer(2)
  let introTxt = w.addText(item.intro)
  introTxt.font = Font.mediumSystemFont(12)
  introTxt.textColor = Color.white()
  introTxt.textOpacity = 0.9
  introTxt.rightAlignText()
  w.addSpacer()
  return w
}

async function loadItem() {
  let url = "https://q24.io/api/v1/idea"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}
