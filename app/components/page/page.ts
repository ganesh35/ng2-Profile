export interface Page {
	_id: { $id: string },
	UserId: string,
	Title: string,
	Alias: string,
	Content: string,
	Lang: string,
	CreatedAt: any,
	UpdatedAt: any,
	Published: number,
	MetaTags : MetaTag[],
	Tags: string[]
}

export interface MetaTag {
	Name: string,
	Content: string
}