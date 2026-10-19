// Vocabulary data for Spelling Galaxy
// Format: [word, part of speech, Vietnamese meaning, English definition, example sentence]
// Units are grouped by CEFR level. Each unit has 10 words.

const VOCAB_LEVELS = [
  {
    id: "a2",
    name: "A1 – A2",
    title: "Cơ bản",
    color: "#4ade80",
    units: [
      {
        name: "Daily life",
        words: [
          ["breakfast", "n", "bữa sáng", "the first meal of the day", "I usually have ___ at seven o'clock."],
          ["shower", "n", "vòi hoa sen; việc tắm vòi sen", "a wash of the body with water from a device above you", "She takes a quick ___ every morning."],
          ["alarm", "n", "chuông báo thức", "a clock that makes a sound to wake you up", "My ___ rings at 6 a.m."],
          ["tired", "adj", "mệt mỏi", "feeling that you need to rest or sleep", "I'm so ___ after work."],
          ["early", "adv", "sớm", "before the usual or expected time", "He gets up ___ to go jogging."],
          ["weekend", "n", "cuối tuần", "Saturday and Sunday", "What do you do at the ___?"],
          ["busy", "adj", "bận rộn", "having a lot of things to do", "I'm too ___ to call you today."],
          ["neighbor", "n", "hàng xóm", "a person who lives near you", "Our ___ has a big dog."],
          ["clean", "v", "lau dọn, làm sạch", "to remove dirt from something", "I ___ my room every Sunday."],
          ["relax", "v", "thư giãn", "to rest and feel calm", "After dinner we ___ and watch TV."]
        ]
      },
      {
        name: "Food & drink",
        words: [
          ["vegetable", "n", "rau củ", "a plant you eat, such as a carrot or potato", "Eat more ___s to stay healthy."],
          ["delicious", "adj", "ngon", "having a very pleasant taste", "This soup is ___!"],
          ["hungry", "adj", "đói", "wanting or needing food", "I'm ___, let's eat."],
          ["kitchen", "n", "nhà bếp", "the room where you cook food", "Mum is cooking in the ___."],
          ["recipe", "n", "công thức nấu ăn", "a set of instructions for cooking a dish", "Can you give me the ___ for this cake?"],
          ["sandwich", "n", "bánh mì kẹp", "two slices of bread with food between them", "I had a cheese ___ for lunch."],
          ["bottle", "n", "cái chai", "a glass or plastic container for liquids", "Please buy a ___ of water."],
          ["dessert", "n", "món tráng miệng", "sweet food eaten at the end of a meal", "We had ice cream for ___."],
          ["spicy", "adj", "cay", "having a strong hot taste", "Thai food is often very ___."],
          ["waiter", "n", "bồi bàn (nam)", "a man who serves food in a restaurant", "The ___ brought us the menu."]
        ]
      },
      {
        name: "Family & people",
        words: [
          ["parents", "n", "bố mẹ", "your mother and father", "My ___ live in Da Nang."],
          ["cousin", "n", "anh chị em họ", "a child of your aunt or uncle", "My ___ is the same age as me."],
          ["married", "adj", "đã kết hôn", "having a husband or wife", "They have been ___ for ten years."],
          ["friendly", "adj", "thân thiện", "kind and pleasant to others", "The people here are very ___."],
          ["daughter", "n", "con gái", "a female child", "Their ___ is a doctor."],
          ["grandmother", "n", "bà", "the mother of your mother or father", "My ___ tells great stories."],
          ["polite", "adj", "lịch sự", "behaving in a way that shows respect", "Be ___ to your teachers."],
          ["twins", "n", "cặp song sinh", "two children born at the same time to the same mother", "The ___ look exactly alike."],
          ["husband", "n", "chồng", "the man a woman is married to", "Her ___ works in a bank."],
          ["smile", "v", "mỉm cười", "to make a happy expression with your mouth", "She always ___s when she sees me."]
        ]
      },
      {
        name: "School",
        words: [
          ["homework", "n", "bài tập về nhà", "school work that you do at home", "I have a lot of ___ tonight."],
          ["teacher", "n", "giáo viên", "a person whose job is to teach", "Our English ___ is from Canada."],
          ["library", "n", "thư viện", "a place with books you can borrow", "I study in the ___ after class."],
          ["subject", "n", "môn học", "an area of knowledge studied in school", "Math is my favourite ___."],
          ["exam", "n", "kỳ thi", "a formal test of your knowledge", "The final ___ is next week."],
          ["notebook", "n", "quyển vở", "a book of blank pages for writing notes", "Write the new words in your ___."],
          ["classmate", "n", "bạn cùng lớp", "a person in the same class as you", "My ___ helped me with the project."],
          ["uniform", "n", "đồng phục", "special clothes worn by all members of a school", "Students must wear a ___."],
          ["lesson", "n", "bài học, tiết học", "a period of time when someone is taught", "The ___ starts at nine."],
          ["remember", "v", "nhớ", "to keep something in your mind", "I can't ___ his name."]
        ]
      },
      {
        name: "Travel",
        words: [
          ["airport", "n", "sân bay", "a place where planes take off and land", "We arrived at the ___ two hours early."],
          ["ticket", "n", "vé", "a piece of paper that lets you travel or enter", "I bought a train ___ online."],
          ["luggage", "n", "hành lý", "bags and suitcases you take when travelling", "Where can I leave my ___?"],
          ["passport", "n", "hộ chiếu", "an official document for travelling abroad", "Don't forget your ___!"],
          ["journey", "n", "chuyến đi, hành trình", "an act of travelling from one place to another", "It was a long ___ by bus."],
          ["hotel", "n", "khách sạn", "a building where you pay to stay", "We stayed at a small ___ near the beach."],
          ["map", "n", "bản đồ", "a drawing of an area showing roads and places", "Let's look at the ___."],
          ["tourist", "n", "khách du lịch", "a person visiting a place for pleasure", "Hoi An is full of ___s in summer."],
          ["delay", "n", "sự trì hoãn, chậm trễ", "a situation in which something happens later than planned", "There was a two-hour ___ on our flight."],
          ["arrive", "v", "đến nơi", "to reach a place", "What time does the train ___?"]
        ]
      },
      {
        name: "Work",
        words: [
          ["office", "n", "văn phòng", "a room or building where people work at desks", "She works in an ___ downtown."],
          ["salary", "n", "lương", "money you receive for your job each month", "He earns a good ___."],
          ["meeting", "n", "cuộc họp", "an event where people discuss things", "We have a ___ at 10."],
          ["manager", "n", "quản lý", "a person in charge of a team or business", "Talk to the ___ about the problem."],
          ["interview", "n", "buổi phỏng vấn", "a formal meeting to decide if you get a job", "I have a job ___ tomorrow."],
          ["colleague", "n", "đồng nghiệp", "a person you work with", "My ___s are very helpful."],
          ["customer", "n", "khách hàng", "a person who buys goods or services", "The ___ is always right."],
          ["schedule", "n", "lịch trình", "a plan of when things will happen", "Check the ___ for today."],
          ["deadline", "n", "hạn chót", "the time by which something must be done", "The ___ is Friday."],
          ["hire", "v", "thuê, tuyển dụng", "to give someone a job", "They want to ___ two new engineers."]
        ]
      },
      {
        name: "Weather & nature",
        words: [
          ["sunny", "adj", "nắng", "with a lot of sunshine", "It's a beautiful ___ day."],
          ["cloudy", "adj", "nhiều mây", "with many clouds in the sky", "It's ___ but not cold."],
          ["storm", "n", "cơn bão", "very bad weather with strong wind and rain", "A big ___ is coming tonight."],
          ["forest", "n", "rừng", "a large area covered with trees", "We walked through the ___."],
          ["river", "n", "con sông", "a large natural flow of water", "The ___ runs through the city."],
          ["temperature", "n", "nhiệt độ", "how hot or cold something is", "The ___ will drop tonight."],
          ["island", "n", "hòn đảo", "a piece of land surrounded by water", "Phu Quoc is a beautiful ___."],
          ["mountain", "n", "ngọn núi", "a very high hill", "Fansipan is the highest ___ in Vietnam."],
          ["flower", "n", "bông hoa", "the coloured part of a plant", "She gave me a red ___."],
          ["windy", "adj", "có gió", "with a lot of wind", "It's too ___ to go out."]
        ]
      },
      {
        name: "Body & health",
        words: [
          ["headache", "n", "đau đầu", "a pain in your head", "I have a terrible ___."],
          ["doctor", "n", "bác sĩ", "a person who treats sick people", "You should see a ___."],
          ["medicine", "n", "thuốc", "something you take to treat an illness", "Take this ___ twice a day."],
          ["healthy", "adj", "khỏe mạnh", "in good physical condition", "Eating fruit keeps you ___."],
          ["stomach", "n", "dạ dày, bụng", "the part of the body where food is digested", "My ___ hurts."],
          ["exercise", "n", "tập thể dục", "physical activity to stay fit", "I do ___ every morning."],
          ["fever", "n", "sốt", "a higher body temperature than normal", "The baby has a ___."],
          ["cough", "v", "ho", "to push air out of your throat with a sudden sound", "He ___ed all night."],
          ["shoulder", "n", "vai", "the part between your neck and arm", "I hurt my ___ playing tennis."],
          ["hospital", "n", "bệnh viện", "a place where sick people are treated", "She works at a children's ___."]
        ]
      },
      {
        name: "Shopping & money",
        words: [
          ["expensive", "adj", "đắt", "costing a lot of money", "This phone is too ___."],
          ["cheap", "adj", "rẻ", "costing little money", "Street food here is really ___."],
          ["discount", "n", "giảm giá", "a reduction in price", "There is a 20% ___ today."],
          ["receipt", "n", "hóa đơn, biên lai", "a piece of paper showing you paid", "Keep the ___ in case you need to return it."],
          ["wallet", "n", "ví", "a small flat case for money and cards", "I left my ___ at home."],
          ["price", "n", "giá cả", "the amount of money you pay for something", "What's the ___ of this shirt?"],
          ["market", "n", "chợ", "a place where people buy and sell goods", "We buy fish at the ___."],
          ["cash", "n", "tiền mặt", "money in the form of coins or notes", "Do you pay by card or ___?"],
          ["size", "n", "kích cỡ", "how big or small something is", "Do you have this in a larger ___?"],
          ["borrow", "v", "mượn", "to take something and return it later", "Can I ___ some money?"]
        ]
      },
      {
        name: "Hobbies & free time",
        words: [
          ["guitar", "n", "đàn ghi-ta", "a musical instrument with six strings", "He plays the ___ in a band."],
          ["painting", "n", "bức tranh; hội họa", "a picture made with paint", "This ___ is 200 years old."],
          ["movie", "n", "bộ phim", "a film shown at a cinema", "Let's watch a ___ tonight."],
          ["swimming", "n", "bơi lội", "the sport of moving through water", "___ is great exercise."],
          ["photograph", "n", "bức ảnh", "a picture taken with a camera", "She took a ___ of the sunset."],
          ["concert", "n", "buổi hòa nhạc", "a live music performance", "We went to a rock ___."],
          ["novel", "n", "tiểu thuyết", "a long written story", "I'm reading a ___ by Nguyen Nhat Anh."],
          ["collect", "v", "sưu tầm", "to gather things as a hobby", "I ___ old coins."],
          ["camping", "n", "cắm trại", "sleeping outdoors in a tent", "We went ___ in the mountains."],
          ["puzzle", "n", "trò chơi ghép hình, câu đố", "a game you solve by thinking", "This ___ has 1000 pieces."]
        ]
      },
      {
        name: "Money basics",
        words: [
          ["save", "v", "tiết kiệm (tiền)", "to keep money instead of spending it", "I ___ 20% of my salary every month."],
          ["spend", "v", "chi tiêu", "to use money to buy things", "Don't ___ all your money on games."],
          ["coin", "n", "đồng xu", "a small round piece of metal used as money", "He found a gold ___ on the beach."],
          ["bank", "n", "ngân hàng", "a place that keeps and lends money", "I need to go to the ___ to open an account."],
          ["loan", "n", "khoản vay", "money that you borrow and must pay back", "She took out a ___ to buy a motorbike."],
          ["bill", "n", "hóa đơn (tiền điện, nước...)", "a document showing how much you must pay", "The electricity ___ is very high this month."],
          ["earn", "v", "kiếm (tiền)", "to receive money for work", "How much do you ___ a month?"],
          ["afford", "v", "có đủ tiền mua", "to have enough money to buy something", "I can't ___ a new laptop right now."],
          ["account", "n", "tài khoản (ngân hàng)", "an arrangement with a bank to keep your money", "Please transfer the money to my ___."],
          ["rich", "adj", "giàu", "having a lot of money", "He became ___ by selling coffee."]
        ]
      },
      {
        name: "Feelings & mind",
        words: [
          ["mood", "n", "tâm trạng", "the way you feel at a particular time", "She's in a good ___ today."],
          ["stress", "n", "căng thẳng", "worry caused by a difficult situation", "Exams cause a lot of ___."],
          ["calm", "adj", "bình tĩnh", "relaxed and not worried", "Stay ___ and breathe slowly."],
          ["memory", "n", "trí nhớ; ký ức", "the ability to remember things", "My grandfather has a great ___."],
          ["habit", "n", "thói quen", "something you do regularly, often without thinking", "Reading before bed is a good ___."],
          ["dream", "n", "giấc mơ", "pictures and events in your mind while you sleep", "I had a strange ___ last night."],
          ["lonely", "adj", "cô đơn", "unhappy because you are alone", "He felt ___ in the new city."],
          ["worry", "v", "lo lắng", "to keep thinking about problems", "Don't ___, everything will be fine."],
          ["patient", "adj", "kiên nhẫn", "able to wait calmly without getting angry", "Be ___, the bus is coming."],
          ["focus", "v", "tập trung", "to give all your attention to something", "I can't ___ with this noise."]
        ]
      }
    ]
  },
  {
    id: "b2",
    name: "B1 – B2",
    title: "Trung cấp",
    color: "#60a5fa",
    units: [
      {
        name: "Environment",
        words: [
          ["pollution", "n", "sự ô nhiễm", "damage caused to air, water or land by harmful substances", "Air ___ is a big problem in large cities."],
          ["recycle", "v", "tái chế", "to process used materials so they can be used again", "We ___ paper, glass and plastic."],
          ["climate", "n", "khí hậu", "the usual weather conditions in a place", "The ___ here is hot and humid."],
          ["endangered", "adj", "có nguy cơ tuyệt chủng", "at risk of no longer existing", "Tigers are an ___ species."],
          ["renewable", "adj", "tái tạo được", "able to be replaced naturally and never used up", "Solar power is a ___ energy source."],
          ["drought", "n", "hạn hán", "a long period with little or no rain", "The ___ destroyed the crops."],
          ["wildlife", "n", "động vật hoang dã", "animals and plants living in natural conditions", "The park protects local ___."],
          ["sustainable", "adj", "bền vững", "able to continue without damaging the environment", "We need more ___ farming methods."],
          ["emission", "n", "khí thải", "gas sent out into the air", "Cars produce carbon ___s."],
          ["conserve", "v", "bảo tồn", "to protect something from being wasted or destroyed", "We must ___ water during the dry season."]
        ]
      },
      {
        name: "Technology",
        words: [
          ["device", "n", "thiết bị", "a machine or tool made for a particular purpose", "Turn off all electronic ___s."],
          ["software", "n", "phần mềm", "programs used by a computer", "Update the ___ regularly."],
          ["password", "n", "mật khẩu", "a secret word used to access a system", "Never share your ___."],
          ["download", "v", "tải xuống", "to copy data from the internet to your device", "You can ___ the app for free."],
          ["artificial", "adj", "nhân tạo", "made by people, not natural", "___ intelligence is changing our lives."],
          ["network", "n", "mạng lưới", "a system of connected computers or people", "The ___ is down again."],
          ["innovation", "n", "sự đổi mới, cải tiến", "a new idea, method or product", "The company is known for ___."],
          ["upgrade", "v", "nâng cấp", "to improve something to a newer version", "I need to ___ my laptop."],
          ["virtual", "adj", "ảo", "existing on a computer rather than in the real world", "We had a ___ meeting on Zoom."],
          ["backup", "n", "bản sao lưu", "a copy of data kept in case the original is lost", "Always keep a ___ of your files."]
        ]
      },
      {
        name: "Education",
        words: [
          ["scholarship", "n", "học bổng", "money given to a student to pay for study", "She won a ___ to study abroad."],
          ["lecture", "n", "bài giảng", "a formal talk given to a group of students", "The ___ on history was fascinating."],
          ["curriculum", "n", "chương trình học", "the subjects taught at a school", "Coding is part of the new ___."],
          ["graduate", "v", "tốt nghiệp", "to complete a degree or course", "He will ___ from university next year."],
          ["assignment", "n", "bài tập được giao", "a piece of work given to students", "The ___ is due on Monday."],
          ["tuition", "n", "học phí", "money paid for teaching", "___ fees have risen sharply."],
          ["literacy", "n", "khả năng đọc viết", "the ability to read and write", "The country has a high ___ rate."],
          ["degree", "n", "bằng cấp (đại học)", "a qualification given by a university", "She has a ___ in economics."],
          ["semester", "n", "học kỳ", "one of the two periods a school year is divided into", "The spring ___ starts in January."],
          ["revise", "v", "ôn tập", "to study again before an exam", "I need to ___ for my history test."]
        ]
      },
      {
        name: "Society",
        words: [
          ["community", "n", "cộng đồng", "a group of people living in the same area", "The whole ___ helped after the flood."],
          ["poverty", "n", "sự nghèo đói", "the state of being very poor", "Many families still live in ___."],
          ["equality", "n", "sự bình đẳng", "the state of being equal in rights and opportunities", "They fight for gender ___."],
          ["volunteer", "n", "tình nguyện viên", "a person who works without being paid", "She is a ___ at the animal shelter."],
          ["population", "n", "dân số", "all the people living in a place", "Vietnam has a ___ of about 100 million."],
          ["charity", "n", "tổ chức từ thiện", "an organisation that helps people in need", "He gives money to ___ every month."],
          ["tradition", "n", "truyền thống", "a custom passed from one generation to the next", "Tet is an important ___ in Vietnam."],
          ["immigrant", "n", "người nhập cư", "a person who comes to live in a foreign country", "Many ___s work in the city."],
          ["generation", "n", "thế hệ", "all the people born around the same time", "The younger ___ loves technology."],
          ["discrimination", "n", "sự phân biệt đối xử", "treating a person unfairly because of who they are", "Racial ___ is illegal."]
        ]
      },
      {
        name: "Emotions",
        words: [
          ["anxious", "adj", "lo lắng", "worried and nervous", "I feel ___ before exams."],
          ["grateful", "adj", "biết ơn", "feeling thankful", "I'm so ___ for your help."],
          ["embarrassed", "adj", "xấu hổ, ngượng", "feeling ashamed or shy in front of others", "He was ___ when he forgot her name."],
          ["frustrated", "adj", "bực bội, nản", "annoyed because you cannot achieve something", "I get ___ when the wifi is slow."],
          ["confident", "adj", "tự tin", "sure about your own abilities", "She is a ___ speaker."],
          ["jealous", "adj", "ghen tị", "unhappy because someone has something you want", "He was ___ of his brother's success."],
          ["disappointed", "adj", "thất vọng", "sad because something was not as good as expected", "We were ___ with the result."],
          ["curious", "adj", "tò mò", "wanting to know or learn things", "Children are naturally ___."],
          ["overwhelmed", "adj", "choáng ngợp, quá tải", "having too many feelings or too much to deal with", "I felt ___ by all the work."],
          ["relieved", "adj", "nhẹ nhõm", "happy because something bad did not happen", "I was ___ to hear she was safe."]
        ]
      },
      {
        name: "Business",
        words: [
          ["profit", "n", "lợi nhuận", "money gained after costs are paid", "The company made a huge ___ last year."],
          ["investment", "n", "sự đầu tư", "money put into something to earn more money", "Real estate is a popular ___."],
          ["competitor", "n", "đối thủ cạnh tranh", "a company or person trying to be more successful than another", "Our main ___ lowered their prices."],
          ["negotiate", "v", "đàm phán", "to discuss in order to reach an agreement", "We need to ___ a better deal."],
          ["entrepreneur", "n", "doanh nhân khởi nghiệp", "a person who starts a business", "She is a successful tech ___."],
          ["budget", "n", "ngân sách", "a plan of how much money can be spent", "We have a small marketing ___."],
          ["revenue", "n", "doanh thu", "the total money a company receives", "___ grew by 15% this quarter."],
          ["strategy", "n", "chiến lược", "a plan to achieve a long-term goal", "What is your growth ___?"],
          ["bankrupt", "adj", "phá sản", "unable to pay debts", "The shop went ___ during the crisis."],
          ["launch", "v", "ra mắt, tung ra", "to start selling a new product", "They will ___ the new phone in May."]
        ]
      },
      {
        name: "Media",
        words: [
          ["headline", "n", "tiêu đề báo", "the title of a newspaper article", "The ___ caught everyone's attention."],
          ["journalist", "n", "nhà báo", "a person who writes news reports", "The ___ interviewed the minister."],
          ["broadcast", "v", "phát sóng", "to send out a programme on TV or radio", "The match will be ___ live."],
          ["advertisement", "n", "quảng cáo", "a notice or video promoting a product", "That ___ is really annoying."],
          ["audience", "n", "khán giả", "the people watching or listening", "The ___ clapped loudly."],
          ["influencer", "n", "người có ảnh hưởng (trên mạng)", "a person who affects others' choices on social media", "The ___ has two million followers."],
          ["censorship", "n", "sự kiểm duyệt", "the removal of parts of books, films, or news", "Strict ___ limits free speech."],
          ["documentary", "n", "phim tài liệu", "a film giving facts about a real subject", "We watched a ___ about the ocean."],
          ["subscribe", "v", "đăng ký theo dõi", "to pay for or sign up to receive something regularly", "___ to our channel for more videos."],
          ["viral", "adj", "lan truyền nhanh (trên mạng)", "spreading very quickly on the internet", "Her dance video went ___."]
        ]
      },
      {
        name: "Science",
        words: [
          ["experiment", "n", "thí nghiệm", "a scientific test to discover something", "The ___ proved the theory."],
          ["gravity", "n", "trọng lực", "the force that pulls objects toward the earth", "___ makes things fall."],
          ["evidence", "n", "bằng chứng", "facts that show something is true", "There is no ___ for this claim."],
          ["hypothesis", "n", "giả thuyết", "an idea that is tested to see if it is true", "Scientists tested the ___."],
          ["molecule", "n", "phân tử", "the smallest unit of a chemical substance", "A water ___ has two hydrogen atoms."],
          ["theory", "n", "lý thuyết, học thuyết", "a system of ideas that explains something", "Einstein's ___ of relativity changed physics."],
          ["laboratory", "n", "phòng thí nghiệm", "a room used for scientific experiments", "Wear goggles in the ___."],
          ["discovery", "n", "sự khám phá", "the act of finding something new", "The ___ of penicillin saved millions."],
          ["analyze", "v", "phân tích", "to study something carefully to understand it", "We need to ___ the data."],
          ["research", "n", "nghiên cứu", "a detailed study of a subject", "Her ___ focuses on cancer cells."]
        ]
      },
      {
        name: "Culture & arts",
        words: [
          ["festival", "n", "lễ hội", "a special event or celebration", "The lantern ___ is held every month."],
          ["heritage", "n", "di sản", "traditions and buildings passed down through history", "Hue is a UNESCO world ___ site."],
          ["sculpture", "n", "tác phẩm điêu khắc", "a piece of art made from stone, metal, or wood", "The ___ stands in the main square."],
          ["exhibition", "n", "triển lãm", "a public show of art or objects", "We visited a photography ___."],
          ["performance", "n", "buổi biểu diễn", "an act of entertaining an audience", "The ___ lasted two hours."],
          ["literature", "n", "văn học", "written works such as novels and poems", "She studies English ___."],
          ["ancestor", "n", "tổ tiên", "a family member from long ago", "We honour our ___s during Tet."],
          ["custom", "n", "phong tục", "a traditional way of behaving", "It's a ___ to give lucky money."],
          ["masterpiece", "n", "kiệt tác", "a work of art of great skill", "The Mona Lisa is a ___."],
          ["inspire", "v", "truyền cảm hứng", "to give someone the desire to do something", "Her story ___d millions."]
        ]
      },
      {
        name: "Relationships",
        words: [
          ["trust", "n", "lòng tin", "belief that someone is honest and reliable", "___ is the base of every friendship."],
          ["argument", "n", "cuộc cãi vã", "a disagreement, often angry", "They had an ___ about money."],
          ["apologize", "v", "xin lỗi", "to say sorry", "You should ___ to her."],
          ["loyal", "adj", "trung thành", "always supporting someone", "Dogs are very ___ animals."],
          ["sympathy", "n", "sự cảm thông", "understanding of another person's suffering", "She showed great ___ for the victims."],
          ["compromise", "n", "sự thỏa hiệp", "an agreement where each side gives up something", "We reached a ___ after hours of talks."],
          ["engaged", "adj", "đã đính hôn", "having agreed to marry", "They got ___ last month."],
          ["forgive", "v", "tha thứ", "to stop being angry with someone", "Can you ever ___ me?"],
          ["acquaintance", "n", "người quen", "someone you know slightly", "He's just an ___, not a friend."],
          ["bond", "n", "mối liên kết, gắn bó", "a close connection between people", "The ___ between the twins is strong."]
        ]
      },
      {
        name: "Personal finance",
        words: [
          ["income", "n", "thu nhập", "money you receive regularly from work or investments", "Her monthly ___ is about 20 million dong."],
          ["expense", "n", "chi phí, khoản chi", "money spent on something", "Rent is my biggest ___."],
          ["savings", "n", "tiền tiết kiệm", "money you have saved, usually in a bank", "He used his ___ to start a business."],
          ["debt", "n", "nợ", "money that you owe to someone", "They are struggling to pay off their ___."],
          ["interest", "n", "lãi suất; tiền lãi", "extra money paid when you borrow or earn when you save", "The bank pays 6% ___ a year."],
          ["mortgage", "n", "khoản vay thế chấp mua nhà", "a loan used to buy a house", "They took out a 25-year ___."],
          ["insurance", "n", "bảo hiểm", "an agreement where a company pays if something bad happens", "Health ___ covers hospital costs."],
          ["tax", "n", "thuế", "money paid to the government", "Income ___ is deducted from your salary."],
          ["pension", "n", "lương hưu", "money paid regularly to someone who has retired", "He lives on a small ___."],
          ["installment", "n", "khoản trả góp", "one of several payments made over time", "I'm paying for the phone in twelve ___s."]
        ]
      },
      {
        name: "Banking & markets",
        words: [
          ["deposit", "v", "gửi tiền (vào ngân hàng)", "to put money into a bank account", "I ___ed 5 million dong yesterday."],
          ["withdraw", "v", "rút tiền", "to take money out of a bank account", "You can ___ cash from any ATM."],
          ["transfer", "v", "chuyển khoản", "to move money from one account to another", "Please ___ the money before Friday."],
          ["stock", "n", "cổ phiếu", "a share in the ownership of a company", "He bought ___ in a tech company."],
          ["shareholder", "n", "cổ đông", "a person who owns shares in a company", "___s receive part of the profit."],
          ["dividend", "n", "cổ tức", "part of a company's profit paid to shareholders", "The company paid a 5% ___."],
          ["currency", "n", "tiền tệ", "the money used in a particular country", "The ___ of Japan is the yen."],
          ["exchange rate", "n", "tỷ giá hối đoái", "the value of one currency compared to another", "The ___ changes every day."],
          ["credit", "n", "tín dụng; mua chịu", "an arrangement to buy now and pay later", "I bought the TV on ___."],
          ["fee", "n", "phí", "money paid for a service", "The bank charges a small transfer ___."]
        ]
      },
      {
        name: "Psychology basics",
        words: [
          ["behavior", "n", "hành vi", "the way a person or animal acts", "Rewards can change a child's ___."],
          ["motivation", "n", "động lực", "the reason or desire to do something", "Money is not his main ___."],
          ["personality", "n", "tính cách, nhân cách", "the type of person you are, shown by how you behave", "She has a warm and friendly ___."],
          ["therapy", "n", "liệu pháp, trị liệu", "treatment to help with a mental or physical problem", "Talking ___ helped him a lot."],
          ["depression", "n", "trầm cảm", "a serious illness that makes you feel very sad and hopeless", "She was treated for ___."],
          ["self-esteem", "n", "lòng tự trọng", "the feeling of respect for yourself", "Praise builds children's ___."],
          ["mindset", "n", "tư duy, lối suy nghĩ", "a person's way of thinking and attitudes", "A growth ___ helps you learn from failure."],
          ["instinct", "n", "bản năng", "a natural tendency to behave in a certain way", "Birds build nests by ___."],
          ["concentration", "n", "sự tập trung", "the ability to think carefully about one thing", "Noise breaks my ___."],
          ["emotional", "adj", "thuộc về cảm xúc; dễ xúc động", "connected with feelings", "He gets ___ when he talks about his mother."]
        ]
      }
    ]
  },
  {
    id: "c1",
    name: "C1",
    title: "Nâng cao",
    color: "#f472b6",
    units: [
      {
        name: "Academic verbs",
        words: [
          ["elucidate", "v", "làm sáng tỏ", "to make something clear; explain", "The professor ___d the complex theory."],
          ["corroborate", "v", "chứng thực, xác nhận", "to confirm or support with evidence", "The data ___s our hypothesis."],
          ["scrutinize", "v", "xem xét kỹ lưỡng", "to examine something very carefully", "Auditors ___d every transaction."],
          ["postulate", "v", "giả định, đưa ra định đề", "to suggest a theory as a basis for reasoning", "He ___d that the universe is expanding."],
          ["substantiate", "v", "chứng minh bằng bằng chứng", "to provide evidence to prove a claim", "Can you ___ these allegations?"],
          ["juxtapose", "v", "đặt cạnh nhau để so sánh", "to place side by side for comparison", "The film ___s wealth and poverty."],
          ["extrapolate", "v", "ngoại suy", "to estimate by extending known data", "We can ___ future trends from this chart."],
          ["underpin", "v", "làm nền tảng, củng cố", "to form the basis of something", "Trust ___s every good relationship."],
          ["delineate", "v", "phác họa, mô tả chi tiết", "to describe or outline precisely", "The report ___s the main risks."],
          ["ascertain", "v", "xác định, tìm hiểu chắc chắn", "to find out for certain", "Police are trying to ___ the cause."]
        ]
      },
      {
        name: "Argument & debate",
        words: [
          ["compelling", "adj", "thuyết phục, hấp dẫn", "very convincing or interesting", "She made a ___ case for reform."],
          ["fallacy", "n", "ngụy biện, sai lầm trong lập luận", "a mistaken belief or faulty reasoning", "That argument is based on a logical ___."],
          ["refute", "v", "bác bỏ", "to prove a statement wrong", "The lawyer ___d every claim."],
          ["ambiguous", "adj", "mơ hồ, nhiều nghĩa", "having more than one possible meaning", "His answer was deliberately ___."],
          ["rhetoric", "n", "thuật hùng biện", "persuasive speaking or writing", "The speech was full of empty ___."],
          ["premise", "n", "tiền đề", "a statement on which an argument is based", "The ___ of the book is simple."],
          ["concede", "v", "thừa nhận, nhượng bộ", "to admit something is true after denying it", "He ___d that he had been wrong."],
          ["dogmatic", "adj", "giáo điều", "insisting your beliefs are correct without question", "She is too ___ to debate with."],
          ["nuance", "n", "sắc thái tinh tế", "a small difference in meaning or feeling", "The translation lost the ___ of the original."],
          ["contentious", "adj", "gây tranh cãi", "likely to cause disagreement", "Tax is a ___ issue."]
        ]
      },
      {
        name: "Economics",
        words: [
          ["inflation", "n", "lạm phát", "a general rise in prices over time", "___ hit 8% last year."],
          ["recession", "n", "suy thoái kinh tế", "a period of economic decline", "The ___ caused many job losses."],
          ["subsidy", "n", "trợ cấp", "money given by the government to support something", "Farmers receive a fuel ___."],
          ["monopoly", "n", "độc quyền", "complete control of a market by one company", "The firm has a ___ on rail travel."],
          ["volatile", "adj", "biến động mạnh", "likely to change suddenly", "Crypto markets are highly ___."],
          ["fiscal", "adj", "thuộc về tài khóa", "relating to government money and taxes", "The new ___ policy cuts spending."],
          ["tariff", "n", "thuế quan", "a tax on imported goods", "The US raised ___s on steel."],
          ["austerity", "n", "chính sách thắt lưng buộc bụng", "strict government spending cuts", "Years of ___ hurt public services."],
          ["liquidity", "n", "tính thanh khoản", "how easily assets can be turned into cash", "The bank faced a ___ crisis."],
          ["commodity", "n", "hàng hóa (nguyên liệu thô)", "a raw material that can be bought and sold", "Coffee is Vietnam's key export ___."]
        ]
      },
      {
        name: "Politics & law",
        words: [
          ["legislation", "n", "pháp luật, luật pháp", "laws made by a government", "New ___ bans smoking indoors."],
          ["sovereignty", "n", "chủ quyền", "the power of a country to govern itself", "The treaty respects national ___."],
          ["bureaucracy", "n", "bộ máy quan liêu", "a complicated official system with many rules", "___ slows down every project."],
          ["amendment", "n", "sự sửa đổi (luật)", "a change made to a law or document", "Parliament passed the ___."],
          ["jurisdiction", "n", "thẩm quyền xét xử", "the official power to make legal decisions", "The case is outside our ___."],
          ["referendum", "n", "cuộc trưng cầu dân ý", "a vote by all citizens on one question", "The country held a ___ on independence."],
          ["impartial", "adj", "công bằng, không thiên vị", "treating everyone equally", "A judge must remain ___."],
          ["coalition", "n", "liên minh", "a temporary alliance of parties or groups", "The two parties formed a ___."],
          ["verdict", "n", "phán quyết", "the decision of a jury or judge", "The jury reached a guilty ___."],
          ["prosecute", "v", "truy tố", "to officially accuse someone of a crime in court", "He was ___d for fraud."]
        ]
      },
      {
        name: "Psychology & mind",
        words: [
          ["cognitive", "adj", "thuộc về nhận thức", "connected with thinking and understanding", "Sleep improves ___ function."],
          ["resilience", "n", "khả năng phục hồi", "the ability to recover quickly from difficulty", "Children show remarkable ___."],
          ["procrastinate", "v", "trì hoãn", "to delay doing something you should do", "Stop ___ing and start studying!"],
          ["introspection", "n", "sự tự xem xét nội tâm", "the examination of your own thoughts", "Quiet time allows for ___."],
          ["bias", "n", "thiên kiến, định kiến", "an unfair preference or dislike", "The study found gender ___ in hiring."],
          ["empathy", "n", "sự thấu cảm", "the ability to understand others' feelings", "Nurses need great ___."],
          ["subconscious", "adj", "thuộc tiềm thức", "existing in the mind without you being aware", "Dreams reveal ___ fears."],
          ["intuition", "n", "trực giác", "the ability to know something without reasoning", "Trust your ___."],
          ["apathy", "n", "sự thờ ơ", "lack of interest or enthusiasm", "Voter ___ was high."],
          ["perception", "n", "nhận thức, cảm nhận", "the way you notice or understand things", "Colour affects our ___ of size."]
        ]
      },
      {
        name: "Describing people",
        words: [
          ["meticulous", "adj", "tỉ mỉ, cẩn thận", "very careful with details", "She is ___ about her work."],
          ["pragmatic", "adj", "thực dụng, thực tế", "dealing with things in a practical way", "He took a ___ approach."],
          ["eloquent", "adj", "hùng hồn, lưu loát", "able to speak or write well and persuasively", "The ___ speaker moved the crowd."],
          ["tenacious", "adj", "kiên trì, bền bỉ", "not giving up easily", "A ___ reporter uncovered the truth."],
          ["frugal", "adj", "tiết kiệm, đạm bạc", "careful not to spend much money", "My grandfather was very ___."],
          ["arrogant", "adj", "kiêu ngạo", "believing you are better than others", "His ___ attitude lost him friends."],
          ["gregarious", "adj", "thích giao du", "enjoying the company of others", "She is ___ and loves parties."],
          ["indifferent", "adj", "thờ ơ, lãnh đạm", "not caring about something", "He seemed ___ to the news."],
          ["versatile", "adj", "đa tài, linh hoạt", "able to do many different things well", "A ___ actor can play any role."],
          ["complacent", "adj", "tự mãn", "too satisfied with yourself to try harder", "Success made the team ___."]
        ]
      },
      {
        name: "Abstract nouns",
        words: [
          ["paradigm", "n", "mô hình, hệ hình", "a typical model or pattern of something", "The internet caused a ___ shift."],
          ["dichotomy", "n", "sự lưỡng phân, phân đôi", "a division into two opposing parts", "The ___ between work and life is false."],
          ["ramification", "n", "hệ quả, hậu quả (phức tạp)", "a complex result of an action", "The decision had serious ___s."],
          ["catalyst", "n", "chất xúc tác, yếu tố thúc đẩy", "something that causes change to happen", "The war was a ___ for reform."],
          ["discrepancy", "n", "sự khác biệt, không nhất quán", "a difference between things that should match", "There is a ___ in the accounts."],
          ["paradox", "n", "nghịch lý", "a statement that seems to contradict itself", "It's a ___ that less is more."],
          ["consensus", "n", "sự đồng thuận", "general agreement", "The team reached a ___."],
          ["trajectory", "n", "quỹ đạo, lộ trình", "the path something follows over time", "Her career ___ is impressive."],
          ["anomaly", "n", "sự bất thường", "something that differs from what is normal", "The result was a statistical ___."],
          ["criterion", "n", "tiêu chí", "a standard used to judge something", "Price is the main ___ for buyers."]
        ]
      },
      {
        name: "Formal verbs",
        words: [
          ["alleviate", "v", "làm giảm bớt", "to make pain or a problem less severe", "This drug ___s headaches."],
          ["exacerbate", "v", "làm trầm trọng thêm", "to make a problem worse", "Stress ___s the illness."],
          ["mitigate", "v", "giảm thiểu", "to make something less harmful", "Trees ___ the effects of flooding."],
          ["facilitate", "v", "tạo điều kiện thuận lợi", "to make something easier", "Apps ___ online learning."],
          ["undermine", "v", "làm suy yếu", "to gradually weaken something", "Lies ___ public trust."],
          ["perpetuate", "v", "duy trì, kéo dài", "to make something continue, often something bad", "Stereotypes ___ inequality."],
          ["advocate", "v", "ủng hộ, biện hộ", "to publicly support an idea", "She ___s for free education."],
          ["circumvent", "v", "lách, né tránh", "to find a way around an obstacle or rule", "They ___ed the ban using VPNs."],
          ["consolidate", "v", "củng cố, hợp nhất", "to combine or make stronger", "The firm ___d its market position."],
          ["relinquish", "v", "từ bỏ", "to give up something, often unwillingly", "He ___ed control of the company."]
        ]
      },
      {
        name: "Adverbs & linkers",
        words: [
          ["nevertheless", "adv", "tuy nhiên", "in spite of that", "It was raining; ___, we went out."],
          ["inherently", "adv", "vốn dĩ, về bản chất", "as a natural and permanent quality", "The job is ___ risky."],
          ["predominantly", "adv", "chủ yếu", "mostly; mainly", "The area is ___ rural."],
          ["inevitably", "adv", "chắc chắn, không thể tránh khỏi", "in a way that cannot be avoided", "Prices will ___ rise."],
          ["arguably", "adv", "có thể cho rằng", "it can be argued that", "He is ___ the best player ever."],
          ["notwithstanding", "prep", "bất chấp, mặc dù", "despite", "___ the risks, they went ahead."],
          ["subsequently", "adv", "sau đó", "afterwards", "He was ___ promoted to manager."],
          ["ostensibly", "adv", "bề ngoài là, có vẻ như", "apparently, but perhaps not really", "He left ___ to buy milk."],
          ["invariably", "adv", "luôn luôn, bất biến", "always, without exception", "She ___ arrives late."],
          ["hitherto", "adv", "cho đến nay", "until now", "This was ___ unknown."]
        ]
      },
      {
        name: "Global issues",
        words: [
          ["humanitarian", "adj", "nhân đạo", "concerned with reducing human suffering", "The UN sent ___ aid."],
          ["displacement", "n", "sự di dời, tha hương", "the forced movement of people from their homes", "War caused mass ___."],
          ["infrastructure", "n", "cơ sở hạ tầng", "basic systems such as roads and power", "The city needs better ___."],
          ["deforestation", "n", "nạn phá rừng", "the cutting down of forests", "___ threatens the rainforest."],
          ["pandemic", "n", "đại dịch", "a disease spreading across the world", "The ___ changed how we work."],
          ["sanction", "n", "lệnh trừng phạt", "an official penalty against a country", "The EU imposed economic ___s."],
          ["biodiversity", "n", "đa dạng sinh học", "the variety of life in an area", "Coral reefs are rich in ___."],
          ["urbanization", "n", "đô thị hóa", "the growth of cities", "Rapid ___ strains housing."],
          ["geopolitical", "adj", "địa chính trị", "relating to politics affected by geography", "The region faces ___ tension."],
          ["unprecedented", "adj", "chưa từng có", "never having happened before", "The heatwave was ___."]
        ]
      },
      {
        name: "Corporate finance",
        words: [
          ["asset", "n", "tài sản", "something valuable a company or person owns", "Real estate is their largest ___."],
          ["liability", "n", "khoản nợ phải trả", "money a company owes", "The firm's ___s exceed its assets."],
          ["equity", "n", "vốn chủ sở hữu", "the value of a company's shares; ownership", "The founders hold 60% of the ___."],
          ["leverage", "n", "đòn bẩy tài chính", "the use of borrowed money to increase potential returns", "High ___ makes a company risky."],
          ["depreciation", "n", "khấu hao", "the fall in value of an asset over time", "Cars suffer rapid ___."],
          ["valuation", "n", "định giá", "an estimate of how much a company is worth", "The startup reached a ___ of one billion dollars."],
          ["cash flow", "n", "dòng tiền", "money moving into and out of a business", "Poor ___ can sink a profitable firm."],
          ["solvent", "adj", "có khả năng thanh toán nợ", "having enough money to pay debts", "The bank is still ___ despite losses."],
          ["audit", "n", "kiểm toán", "an official examination of financial records", "The annual ___ found no errors."],
          ["overhead", "n", "chi phí cố định, chi phí chung", "regular business costs such as rent and salaries", "Working remotely reduces ___."]
        ]
      },
      {
        name: "Investing",
        words: [
          ["diversify", "v", "đa dạng hóa (danh mục đầu tư)", "to spread investments across different assets to reduce risk", "Never put all your money in one stock; ___."],
          ["speculation", "n", "đầu cơ", "buying assets hoping to profit from price changes, often with high risk", "The price rise was driven by ___."],
          ["yield", "n", "lợi suất", "the income an investment produces, as a percentage", "Government bonds offer a 4% ___."],
          ["portfolio", "n", "danh mục đầu tư", "all the investments owned by a person or organisation", "Her ___ includes stocks and gold."],
          ["hedge", "v", "phòng ngừa rủi ro", "to protect against financial loss", "Investors ___ against inflation by buying gold."],
          ["bubble", "n", "bong bóng (giá tài sản)", "a situation where prices rise far above real value and then collapse", "The housing ___ burst in 2008."],
          ["compound interest", "n", "lãi kép", "interest calculated on both the original amount and previous interest", "___ makes small savings grow huge over time."],
          ["maturity", "n", "kỳ hạn, ngày đáo hạn", "the date when a loan or bond must be repaid", "The bond reaches ___ in ten years."],
          ["bearish", "adj", "giảm giá (xu hướng thị trường)", "expecting prices to fall", "Analysts are ___ on tech stocks this year."],
          ["arbitrage", "n", "kinh doanh chênh lệch giá", "profiting from price differences in different markets", "Traders use ___ between exchanges."]
        ]
      },
      {
        name: "Cognitive psychology",
        words: [
          ["heuristic", "n", "phương pháp suy nghiệm, lối tắt tư duy", "a mental shortcut used to make quick decisions", "Rules of thumb are a kind of ___."],
          ["conditioning", "n", "sự điều kiện hóa", "learning in which behaviour becomes linked to a stimulus", "Pavlov's dogs showed classical ___."],
          ["reinforcement", "n", "sự củng cố (hành vi)", "a reward or punishment that makes behaviour more or less likely", "Positive ___ works better than punishment."],
          ["dissonance", "n", "sự bất hòa (nhận thức)", "discomfort from holding two conflicting beliefs", "Smokers who know the risks feel cognitive ___."],
          ["placebo", "n", "giả dược", "a fake treatment that works because the patient believes in it", "Half the patients received a ___."],
          ["priming", "n", "sự mồi (nhận thức)", "exposure to one thing influencing a response to another", "___ with the word 'old' made people walk slower."],
          ["attention span", "n", "khoảng chú ý", "the length of time a person can concentrate", "Social media shortens our ___."],
          ["schema", "n", "lược đồ nhận thức", "a mental framework for organising knowledge", "Children build a ___ for what a 'dog' is."],
          ["salient", "adj", "nổi bật, dễ nhận thấy", "most noticeable or important", "Fear makes threats more ___."],
          ["metacognition", "n", "siêu nhận thức", "awareness and understanding of your own thinking", "Good learners use ___ to plan their study."]
        ]
      },
      {
        name: "Clinical psychology",
        words: [
          ["trauma", "n", "sang chấn tâm lý", "severe emotional shock after a terrible experience", "War leaves deep ___ in children."],
          ["burnout", "n", "kiệt sức (do công việc)", "exhaustion caused by long-term stress", "Nurses face a high risk of ___."],
          ["stigma", "n", "sự kỳ thị", "a strong feeling of disapproval that society has about something", "The ___ around mental illness stops people seeking help."],
          ["compulsive", "adj", "cưỡng chế, không kiểm soát được", "unable to stop doing something", "He is a ___ gambler."],
          ["delusion", "n", "hoang tưởng", "a false belief held despite evidence against it", "She suffered from the ___ that she was being followed."],
          ["rumination", "n", "sự nhai lại suy nghĩ tiêu cực", "repeatedly thinking about negative experiences", "___ keeps depression going."],
          ["coping", "n", "sự ứng phó (với căng thẳng)", "ways of dealing with stress or difficulty", "Exercise is a healthy ___ strategy."],
          ["attachment", "n", "sự gắn bó (tâm lý)", "a strong emotional bond, especially between child and caregiver", "Secure ___ in infancy predicts healthy relationships."],
          ["mindfulness", "n", "chánh niệm", "paying full attention to the present moment", "___ meditation reduces anxiety."],
          ["psychiatrist", "n", "bác sĩ tâm thần", "a medical doctor who treats mental illness", "A ___ can prescribe medication."]
        ]
      }
    ]
  }
];
