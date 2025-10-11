import type { INote, TCustomCategory } from "../interfaces/Data.interface";

export interface INotesCategoryCount {
	category: TCustomCategory;
	count: number;
}

export class Notes {
	notes: INote[];
	protected indexedNotes: Record<string, INote>;
	protected indexedIDs: Record<string, number>;
	notesCategoriesCount: INotesCategoryCount[];

	constructor() {
		this.notes = [];
		this.indexedNotes = {};
		this.indexedIDs = {};
		this.notesCategoriesCount = [];
	}

	init(notes: INote[]) {
		this.notes = notes;
		this.indexedNotes = this.getIndexedNotes();
		this.indexedIDs = this.getIndexedIDs();
		this.notesCategoriesCount = this.getNotesCategoriesCount();
	}

	protected getIndexedNotes(): Record<string, INote> {
		const indexedNotes: Record<string, INote> = {};
		for (const note of this.notes) indexedNotes[note.note_id] = note;
		return indexedNotes;
	}

	protected getIndexedIDs(): Record<string, number> {
		const indexedIDs: Record<string, number> = {};
		for (let i = 0; i < this.notes.length; i++)
			indexedIDs[this.notes[i].note_id] = i;
		return indexedIDs;
	}

	create(note: INote): void {
		const notes = [note, ...this.notes];
		this.updateNotesData(notes);
	}

	update(note: INote): void {
		const notes = [...this.notes];
		notes[this.indexedIDs[note.note_id]] = note;
		this.updateNotesData(notes);
	}

	delete(noteID: string): void {
		const notes = [...this.notes].filter((note) => note.note_id != noteID);
		this.updateNotesData(notes);
	}

	protected updateNotesData(notes: INote[]): void {
		this.notes = notes;
		this.indexedNotes = this.getIndexedNotes();
		this.indexedIDs = this.getIndexedIDs();
		this.notesCategoriesCount = this.getNotesCategoriesCount();
	}

	includes(noteID: string): boolean {
		return noteID in this.indexedNotes;
	}

	getNote(noteID: string): INote {
		return this.indexedNotes[noteID];
	}

	protected getNotesCategoriesCount(): INotesCategoryCount[] {
		const notesCategoriesCount: Record<string, number> = {};
		for (const note of this.notes)
			notesCategoriesCount[note.category ?? "Work"] =
				(notesCategoriesCount[note.category ?? "Work"] || 0) + 1;

		return Object.entries(notesCategoriesCount)
			.map(([category, count]) => ({
				category: category as TCustomCategory,
				count,
			}))
			.sort((a, b) => b.count - a.count);
	}
}
