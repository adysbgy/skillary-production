import sys

def main():
path = "/Users/aj/Downloads/Proyek & Klien/skillary-production/src/app/admin/courses/[id]/edit/page.tsx"
with open(path, "r", encoding = "utf-8") as f:
content = f.read()

    # 1. Add activeTab to state
content = content.replace(
    "const [saving, setSaving] = useState(false);",
    "const [saving, setSaving] = useState(false);\n    const [activeTab, setActiveTab] = useState<\"Curriculum\" | \"Setup\" | \"Pricing\" | \"Settings\">(\"Curriculum\");"
)

    # 2. Add Tab Bar below the header
tab_bar_html = """
    < div className = "flex items-center gap-6 mb-8 border-b border-black/10 overflow-x-auto" >
        {(["Curriculum", "Setup", "Pricing", "Settings"] as const).map(tab => (
            <button
                        key= { tab }
                        onClick = {() => setActiveTab(tab)}
            className = {`pb-3 text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-[#EB6C64] text-black" : "border-transparent text-black/40 hover:text-black/70"}`}
                    >
                { tab === "Setup" ? "Setup & Landing Page" : tab === "Pricing" ? "Pricing & Access" : tab}
            </button>
        ))}
</div>
"""
    
    # Locate where to insert tab bar.After status line and error messages
search_str = "{successMsg && <div className=\"mb-6 p-4 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-medium\">{successMsg}</div>}"
if search_str in content:
    content = content.replace(search_str, search_str + "\n" + tab_bar_html)
    
    # 3. Extract Duplicate / Deletion buttons to place them in Settings Tab.
    # Note: They are inside < div className = "flex items-center justify-end gap-3 mb-4" >
    # We will search for this div and remove it from the top.
    
    # We'll use string finding for precise extraction
dup_start = content.find("<div className=\"flex items-center justify-end gap-3 mb-4\">\n                <button\n                    onClick={async () => {\n                        if (!confirm(`Duplicate")
dup_end = content.find("⊘ Attempt Deletion\n                </button>\n            </div>", dup_start) + len("⊘ Attempt Deletion\n                </button>\n            </div>")

settings_actions = content[dup_start:dup_end]
content = content[:dup_start]+ content[dup_end:]
    
    # 4. Wrap sections
    # Find Left Column start:
left_col_start = content.find("<div className=\"space-y-8\">")
left_col_inner_start = left_col_start + len("<div className=\"space-y-8\">")
    
    # Wrap Cover Image and Marketing Metadata and Core form(Setup) in Setup tab
    # Wait, instead of slicing, let's inject wrappers around specific Cards.
    
    # Wrap Cover Image
cover_image_idx = content.find("{/* Thumbnail Upload */}")
if cover_image_idx != -1:
    content = content[:cover_image_idx]+ "{activeTab === 'Setup' && (\n<>\n" + content[cover_image_idx:]

    # Core Content ends at 
    # < /form>\n                    </Card >
    # After core content is Marketing Metadata, then Curriculum Builder.
    # Let's find ">Marketing Metadata</h2>"
marketing_idx = content.find(">Marketing Metadata</h2>")
marketing_end_card = content.find("</Card>", marketing_idx) + len("</Card>")
    
    # End Setup wrapper
content = content[:marketing_end_card]+ "\n</>\n)}\n" + content[marketing_end_card:]
    
    # Wrap Curriculum Builder
curriculum_start = content.find("<div className=\"space-y-4\">\n                        <div className=\"flex items-center justify-between\">\n                            <h2 className=\"text-xl font-semibold tracking-[-0.02em] text-black/90\">Curriculum Builder</h2>")
content = content[:curriculum_start]+ "\n{activeTab === 'Curriculum' && (\n" + content[curriculum_start:]
    
    # End Curriculum Builder
    # Look for:
    # < /div>\n                </div >\n\n<div>\n                    {
    (() => {
    # The end of the left column is the first "</div>\n                </div>"
        curriculum_end = content.find("</div>\n                </div>", curriculum_start)
        content = content[:curriculum_end]+ "\n)}\n" + content[curriculum_end:]
    
    # Now inject Pricing Tab and Settings Tab contents

        pricing_tab_content = """
        {
            activeTab === 'Pricing' && (
                <div className="space-y-8" >
                    <Card className="p-6 border border-black/5 shadow-sm" >
                        <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80" > Pricing & Access </h2>
                            < form onSubmit = { handleUpdateCourse } className = "space-y-5" >
                                <div className="grid grid-cols-2 gap-5" >
                                    <div>
                                    <label className="block text-sm font-medium text-black/70 mb-1.5" > Price(IDR, 0 = Free) </label>
                                        < input type = "number" min = "0" step = "1000" value = { course.price || 0 } onChange = { e => setCourse(c => c? { ...c, price: parseFloat(e.target.value) || 0
        } : c)
    } className = "w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[#F6C34F]/20 font-medium" placeholder = "0" />
        </div>
        < div >
        <label className="block text-sm font-medium text-black/70 mb-1.5" > Status </label>
            < select value = { course.status } onChange = { e => {
        if (e.target.value === "TEMPLATE" && (course as any)._count?.enrollments > 0) {
            if (!confirm("This course has active learners. Changing it to a TEMPLATE will hide it from the public catalog. Do you want to proceed?")) return;
        }
        setCourse(c => c ? { ...c, status: e.target.value } : c);
    }
} className = "w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium" >
    <option value="DRAFT" > DRAFT </option>
        < option value = "PUBLISHED" > PUBLISHED </option>
            < option value = "ARCHIVED" > ARCHIVED(Hide from Public) </option>
{ sessionRole === "ADMIN" && <option value="TEMPLATE" > TEMPLATE(Admin Blueprint) </option> }
</select>
{
    course.status !== "PUBLISHED" && course.status !== "TEMPLATE" && (course as any)._count?.enrollments > 0 && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed" >
            <strong>⚠️ { (course as any)._count.enrollments } learner(s) enrolled.</strong> This course will be hidden from the public catalog, but enrolled learners will retain access to their content and progress.
                </div>
                            )
}
{
    course.status === "TEMPLATE" && (
        <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-800 leading-relaxed" >
            <strong>Admin Blueprint Template.</strong> This course is hidden from learners. Instructors can use this as a starting structure when building new courses.
                </div>
                            )
}
</div>
    </div>
    < div className = "pt-4 border-t border-black/5 flex justify-end" >
        <PrimaryButton type="submit" disabled = { saving } className = "px-8 py-2.5 shadow-sm text-sm" > { saving? "Saving…": "Save Changes" } </PrimaryButton>
            </div>
            </form>
            </Card>

{
    sessionRole === "ADMIN" && (
        <Card className="p-6 border border-black/10 shadow-sm bg-white" >
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-widest text-[#EB6C64]" > Manual Access Override </h3>
                < form className = "space-y-4" onSubmit = { async(e) => {
        e.preventDefault();
        const submitBtn = (e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement);
        submitBtn.disabled = true;
        submitBtn.innerText = "Executing...";
        try {
            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
            const action = (e.currentTarget.elements.namedItem("action") as HTMLSelectElement).value;
            const res = await fetch("/api/admin/enrollments", {
                method: action,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, courseId: course.id })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Override failed");
            alert(data.success ? `Success: ${action === "POST" ? "Access granted." : "Access revoked."}` : "Completed");
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            alert(err.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Execute Override";
        }
    }
}>
    <div className="flex gap-4" >
        <input name="email" required placeholder = "Learner Email" className = "flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/25" />
            <select name="action" className = "w-1/3 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/25 font-medium" >
                <option value="POST" > Grant Enrollment </option>
                    < option value = "DELETE" > Revoke Enrollment </option>
                        </select>
                        </div>
                        < div className = "flex justify-between items-center mt-2" >
                            <p className="text-[10px] text-black/40 max-w-sm leading-4" > This action bypasses payment gates.Only explicit ADMIN tokens will successfully authorize against the backend.</p>
                                < SecondaryButton type = "submit" className = "py-2 px-6 text-xs border font-semibold border-black/10 hover:border-black/20" > Execute Override </SecondaryButton>
                                    </div>
                                    </form>
                                    </Card>
            )}
</div>
    )}
"""

settings_tab_content = """
{
    activeTab === 'Settings' && (
        <div className="space-y-8" >
            <Card className="p-6 border border-black/5 shadow-sm" >
                <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80" > Danger Zone & Admin Tools </h2>

    {
        sessionRole === "ADMIN" && instructors.length > 0 && (
            <div className="mb-8 p-5 bg-black/[0.02] border border-black/5 rounded-xl" >
                <label className="block text-sm font-medium text-black/70 mb-1.5 pt-1" > Transfer Instructor Ownership </label>
                    < select
        value = { course.instructorId || "" }
        onChange = { async(e) => {
            const newInstructorId = e.target.value;
            const instructor = instructors.find(i => i.id === newInstructorId);
            if (!instructor) return;
            if (!confirm(`Reassign this course to ${instructor.name} (${instructor.email})?`)) {
                e.target.value = course.instructorId || "";
                return;
            }
            try {
                const res = await fetch("/api/admin/courses", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: course.id, instructorId: newInstructorId }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Reassignment failed");
                // Use window object safely or just fallback to state mutation since we can't easily rely on outer scope
                // Actually we CAN rely on outer scope in this injection
                setCourse(c => c ? { ...c, instructorId: newInstructorId } : c);
                setSuccessMsg(`Course reassigned to ${instructor.name}.`);
                setTimeout(() => setSuccessMsg(""), 3000);
            } catch (err: any) {
                setErrorMsg(err.message);
            }
        }
    }
    className = "w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium mb-1"
        >
        {!course.instructorId && <option value="" >— Unassigned —</option>
}
{
    instructors.map(i => (
        <option key= { i.id } value = { i.id } > { i.name }({ i.email }) </option>
    ))
}
</select>
    < p className = "text-[10px] text-black/40" > Changing the instructor will permanently transfer ownership of this course.Only Admins can undo this.</p>
        </div>
                )}

<div className="flex items-center gap-4 pt-4 border-t border-black/5" >
    """ + settings_actions.replace('<div className="flex items - center justify - end gap - 3 mb - 4">', '<div className="flex items - center gap - 3 w - full">') + """
        </div>
        </Card>
        </div>
    )}
"""
    
    # We remove Price and Status and Instructor Assignment from the Core form inside`Setup`
    
    # Find Price section and remove
price_start = content.find("<div>\n                                    <label className=\"block text-sm font-medium text-black/70 mb-1.5\">Price")
price_end = content.find("</div>", price_start) + len("</div>")
content = content[:price_start]+ content[price_end:]
    
    # Find Status section and remove
status_start = content.find("<div>\n                                    <label className=\"block text-sm font-medium text-black/70 mb-1.5\">Status</label>")
status_end = content.find("</div>\n                            </div>\n\n                            {/* Instructor", status_start)
content = content[:status_start]+ "</div>\n                            </div>\n\n                            {/* Instructor" + content[status_end + len("</div>\n                            </div>\n\n                            {/* Instructor"):]

    # Remove Assigned Instructor from Core Content
instructor_start = content.find("{/* Instructor Assignment — ADMIN only */}")
instructor_end = content.find("</p>\n                                </div>\n                            )}", instructor_start) + len("</p>\n                                </div>\n                            )}")
content = content[:instructor_start]+ content[instructor_end:]

    # Also we need to remove Manual Grants from the right sidebar since we moved it.
    manual_grants_start = content.find("{sessionRole === \"ADMIN\" && (\n                        <Card className=\"p-6 mt-6 border border-black/10 shadow-sm bg-white\">\n                            <h3 className=\"font-semibold mb-4 text-xs uppercase tracking-widest text-black/40\">Manual Grants</h3>")
manual_grants_end = content.find("</Card>\n                    )}\n                </div>", manual_grants_start) + len("</Card>\n                    )}")
content = content[:manual_grants_start]+ content[manual_grants_end:]

    # Inject Pricing and Settings tabs right before the end of the left column
content = content[:curriculum_end]+ pricing_tab_content + settings_tab_content + "\n" + content[curriculum_end:]

with open(path, "w", encoding = "utf-8") as f:
f.write(content)

print("DONE")

main()
