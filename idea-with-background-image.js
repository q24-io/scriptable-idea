let item = await loadItem()
let imgURL = "https://picsum.photos/1000?blur=3"
let widget = await createWidget(item, imgURL)
if (!config.runsInWidget) {
  await widget.presentLarge()
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

  let tagText = w.addText(item.tag)
  tagText.font = Font.boldRoundedSystemFont(12)
  w.addSpacer(4)

  let titleTxt = w.addText(item.idea)
  let fontSize = 18
  if (item.idea.length > 30) {
    fontSize = fontSize - 3
  }
  titleTxt.font = Font.heavySystemFont(fontSize)
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

  let curatorText = w.addText("内容由 " + item.curator + " 提供")
  curatorText.font = Font.boldSystemFont(10)
  curatorText.textOpacity = 0.5
  curatorText.rightAlignText()

  titleTxt.textColor = Color.white()
  tagText.textColor = Color.green()
  authorTxt.textColor = Color.white()
  introTxt.textColor = Color.white()
  curatorText.textColor = Color.white()
  w.url = item.url
  return w
}

async function loadItem() {
  let url = "https://q24.io/api/v1/idea"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}