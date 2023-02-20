-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_edited_time" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "object" TEXT DEFAULT 'page',
    "archived" BOOLEAN DEFAULT false,
    "url" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastEditedBy" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "LastEditedBy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageName" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "propertiesId" TEXT NOT NULL,

    CONSTRAINT "PageName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plain_text" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "pageNameId" TEXT,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleAnnotations" (
    "id" TEXT NOT NULL,
    "bold" BOOLEAN NOT NULL,
    "italic" BOOLEAN NOT NULL,
    "strikethrough" BOOLEAN NOT NULL,
    "underline" BOOLEAN NOT NULL,
    "code" BOOLEAN NOT NULL,
    "color" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,

    CONSTRAINT "TitleAnnotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorIdAnnotations" (
    "id" TEXT NOT NULL,
    "bold" BOOLEAN NOT NULL,
    "italic" BOOLEAN NOT NULL,
    "strikethrough" BOOLEAN NOT NULL,
    "underline" BOOLEAN NOT NULL,
    "code" BOOLEAN NOT NULL,
    "color" TEXT NOT NULL,
    "authorIdRichTextId" TEXT NOT NULL,

    CONSTRAINT "AuthorIdAnnotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorNameAnnotations" (
    "id" TEXT NOT NULL,
    "bold" BOOLEAN NOT NULL,
    "italic" BOOLEAN NOT NULL,
    "strikethrough" BOOLEAN NOT NULL,
    "underline" BOOLEAN NOT NULL,
    "code" BOOLEAN NOT NULL,
    "color" TEXT NOT NULL,
    "authorNameRichTextId" TEXT NOT NULL,

    CONSTRAINT "AuthorNameAnnotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleText" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,

    CONSTRAINT "TitleText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorIdText" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT,
    "authorIdRichTextId" TEXT NOT NULL,

    CONSTRAINT "AuthorIdText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorNameText" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "authorIdRichTextId" TEXT NOT NULL,

    CONSTRAINT "AuthorNameText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorName" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "propertiesId" TEXT NOT NULL,

    CONSTRAINT "AuthorName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorId" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "propertiesId" TEXT NOT NULL,

    CONSTRAINT "AuthorId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorIdRichText" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plain_text" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "authorIdId" TEXT,

    CONSTRAINT "AuthorIdRichText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorNameRichText" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plain_text" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "authorNameId" TEXT NOT NULL,

    CONSTRAINT "AuthorNameRichText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "database_id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "emoji" TEXT,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cover" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "External" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "coverId" TEXT NOT NULL,

    CONSTRAINT "External_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatedBy" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "CreatedBy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_url_key" ON "Page"("url");

-- CreateIndex
CREATE UNIQUE INDEX "LastEditedBy_pageId_key" ON "LastEditedBy"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_pageId_key" ON "Properties"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "PageName_propertiesId_key" ON "PageName"("propertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "TitleAnnotations_titleId_key" ON "TitleAnnotations"("titleId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorIdAnnotations_authorIdRichTextId_key" ON "AuthorIdAnnotations"("authorIdRichTextId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorNameAnnotations_authorNameRichTextId_key" ON "AuthorNameAnnotations"("authorNameRichTextId");

-- CreateIndex
CREATE UNIQUE INDEX "TitleText_titleId_key" ON "TitleText"("titleId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorIdText_authorIdRichTextId_key" ON "AuthorIdText"("authorIdRichTextId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorNameText_authorIdRichTextId_key" ON "AuthorNameText"("authorIdRichTextId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorName_propertiesId_key" ON "AuthorName"("propertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorId_propertiesId_key" ON "AuthorId"("propertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorIdRichText_authorIdId_key" ON "AuthorIdRichText"("authorIdId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorNameRichText_authorNameId_key" ON "AuthorNameRichText"("authorNameId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_pageId_key" ON "Parent"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_pageId_key" ON "Icon"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_pageId_key" ON "Cover"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "External_coverId_key" ON "External"("coverId");

-- CreateIndex
CREATE UNIQUE INDEX "CreatedBy_pageId_key" ON "CreatedBy"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastEditedBy" ADD CONSTRAINT "LastEditedBy_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageName" ADD CONSTRAINT "PageName_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_pageNameId_fkey" FOREIGN KEY ("pageNameId") REFERENCES "PageName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleAnnotations" ADD CONSTRAINT "TitleAnnotations_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorIdAnnotations" ADD CONSTRAINT "AuthorIdAnnotations_authorIdRichTextId_fkey" FOREIGN KEY ("authorIdRichTextId") REFERENCES "AuthorIdRichText"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorNameAnnotations" ADD CONSTRAINT "AuthorNameAnnotations_authorNameRichTextId_fkey" FOREIGN KEY ("authorNameRichTextId") REFERENCES "AuthorNameRichText"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleText" ADD CONSTRAINT "TitleText_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorIdText" ADD CONSTRAINT "AuthorIdText_authorIdRichTextId_fkey" FOREIGN KEY ("authorIdRichTextId") REFERENCES "AuthorIdRichText"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorNameText" ADD CONSTRAINT "AuthorNameText_authorIdRichTextId_fkey" FOREIGN KEY ("authorIdRichTextId") REFERENCES "AuthorNameRichText"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorName" ADD CONSTRAINT "AuthorName_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorId" ADD CONSTRAINT "AuthorId_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorIdRichText" ADD CONSTRAINT "AuthorIdRichText_authorIdId_fkey" FOREIGN KEY ("authorIdId") REFERENCES "AuthorId"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorNameRichText" ADD CONSTRAINT "AuthorNameRichText_authorNameId_fkey" FOREIGN KEY ("authorNameId") REFERENCES "AuthorName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "External" ADD CONSTRAINT "External_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Cover"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatedBy" ADD CONSTRAINT "CreatedBy_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
